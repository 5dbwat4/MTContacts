// 配置参数
const DATA_DIR = './';
const BREAK_FILE = './break.wav';
const OUTPUT_DIR = '../output';

/*
说明：
该文件用于处理推广那边发来的音频文件，生成合并后的音频文件和索引文件。
在本次（2025）版本中，音频文件的命名格式为“XX团XX连X.m4a”，其中X为数字。
程序会按团和连对音频文件进行分组，并按数字排序后合并，合并时在每两个音频文件间插入一个电话忙音片段（break.wav）。该片段下载自pixabay
最终生成的音频文件会被存储在../output目录下，并生成一个index.json文件作为索引。
注意：请确保系统已安装ffmpeg，并且可以通过命令行访问。

重要的安全提醒：很显然，通过特定的文件名可以RCE，因此运行该脚本前请检查数据目录下的文件名是否合法。
*/


const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { randomUUID } = require('crypto');

function processAudioFiles() {
  try {
    // 确保输出目录存在
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // 读取数据目录中的所有文件
    const files = fs.readdirSync(DATA_DIR);
    
    // 过滤出.m4a文件并解析文件名
    const audioFiles = files
      .filter(file => file.endsWith('.m4a'))
      .map(file => {
        // 使用正则表达式解析文件名
        const match = file.match(/^(.+团)(.+连)(\d+)\.m4a$/);
        if (!match) return null;
        
        return {
          fileName: file,
          group: match[1],  // 团
          team: match[2],   // 连
          number: parseInt(match[3], 10), // 数字部分
          fullTeam: match[1] + match[2]   // 完整连队名
        };
      })
      .filter(Boolean); // 过滤掉解析失败的文件

    // 按团和连分组
    const groupedFiles = {};
    audioFiles.forEach(file => {
      if (!groupedFiles[file.fullTeam]) {
        groupedFiles[file.fullTeam] = [];
      }
      groupedFiles[file.fullTeam].push(file);
    });

    // 对每个连队的文件按数字排序
    Object.keys(groupedFiles).forEach(team => {
      groupedFiles[team].sort((a, b) => a.number - b.number);
    });

    // 构建索引数据结构
    const indexData = {};
    
    // 处理每个连队的音频文件
    Object.keys(groupedFiles).forEach(team => {
      const files = groupedFiles[team];
      const group = files[0].group;
      const teamName = files[0].team;
      
      // 初始化数据结构
      if (!indexData[group]) {
        indexData[group] = {
          title: group,
          items: []
        };
      }
      
      // 生成UUID作为输出文件名
      const outputFileName = `${randomUUID()}.mp3`;
      const outputPath = path.join(OUTPUT_DIR, outputFileName);
      
      // 构建ffmpeg命令
      let ffmpegCommand = 'ffmpeg';
      
      // 添加输入文件
      files.forEach((file, index) => {
        const filePath = path.join(DATA_DIR, file.fileName);
        ffmpegCommand += ` -i "${filePath}"`;
        if (index < files.length - 1) {
          ffmpegCommand += ` -i "${BREAK_FILE}"`;
        }
      });
      
      // 添加过滤器复杂图形
      ffmpegCommand += ' -filter_complex "';
      let filterIndex = 0;
      let concatInputs = '';
      
      files.forEach((file, index) => {
        concatInputs += `[${filterIndex}:0]`;
        filterIndex++;
        
        if (index < files.length - 1) {
          concatInputs += `[${filterIndex}:0]`;
          filterIndex++;
        }
      });
      
      ffmpegCommand += `${concatInputs}concat=n=${filterIndex}:v=0:a=1[out]" -map "[out]" "${outputPath}"`;
      
      try {
        // 执行ffmpeg命令
        console.log(`处理连队: ${team}`);
        execSync(ffmpegCommand, { stdio: 'inherit' });
        console.log(`已生成: ${outputFileName}`);
        
        // 添加到索引
        indexData[group].items.push({
          title: team,
          audio: outputFileName
        });
      } catch (error) {
        console.error(`处理连队 ${team} 时出错:`, error.message);
      }
    });
    
    // 将索引数据转换为数组
    const indexArray = Object.values(indexData);
    
    // 写入index.json文件
    const indexPath = path.join(OUTPUT_DIR, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(indexArray, null, 2));
    console.log('已生成index.json文件');
    
  } catch (error) {
    console.error('处理过程中发生错误:', error.message);
  }
}

// 执行处理
processAudioFiles();