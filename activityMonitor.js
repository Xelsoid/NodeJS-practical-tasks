const childProcess = require('child_process');
const fs = require('fs');

const execProcess = (command) => {
  const childProcessExecutionInterval = 100;
  // const logWritingInterval = 60000;
  const logWritingInterval = 4000;
  let isProcessRunning = false;
  let fullData = '';

  const executeProcess = (command) => {
    isProcessRunning = true;
    const process = childProcess.exec(command)

    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    process.stdout.on('data', (data) => {
      fullData += `${Date.now()}: ${data}`;
      console.clear();
      console.log(data);
    });

    process.stdout.on('end', () => {
      isProcessRunning = false;
    })
  }

  setInterval(() => {
    !isProcessRunning && executeProcess(command)
  }, childProcessExecutionInterval)


  setInterval(() => {
    fs.appendFile('activityMonitor.log', fullData, (err) => {
      if (err) {
        console.error(err)
      }
    });
  }, logWritingInterval)


}

execProcess('powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object {\'Name:\' + $_.Name + \' CPU:\' + $_.CPU + \' RAM:\' + $_.WorkingSet }"');
