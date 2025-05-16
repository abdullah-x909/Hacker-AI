// Sample database of common terminal commands and their explanations/automation suggestions
const commandDatabase: Record<string, { description: string; example: string; automation?: string }> = {
  'ls': {
    description: 'List directory contents',
    example: 'ls -la',
    automation: 'I can help you filter or search within directory listings. Try "search-files <pattern>"'
  },
  'cd': {
    description: 'Change directory',
    example: 'cd /path/to/directory',
    automation: 'I can track your most frequently used directories and provide quick navigation shortcuts.'
  },
  'grep': {
    description: 'Search for patterns in files',
    example: 'grep "pattern" file.txt',
    automation: 'Try "smart-search <keyword>" for an enhanced search across multiple file types with context.'
  },
  'find': {
    description: 'Search for files in a directory hierarchy',
    example: 'find . -name "*.js"',
    automation: 'I can help build complex find commands. Try "findfiles js modified:today"'
  },
  'nmap': {
    description: 'Network exploration tool and security scanner',
    example: 'nmap -sV 192.168.1.1',
    automation: 'I can suggest secure scanning options and help interpret results.'
  },
  'ping': {
    description: 'Send ICMP ECHO_REQUEST to network hosts',
    example: 'ping google.com',
    automation: 'Try "netcheck domain.com" for a comprehensive connectivity analysis.'
  },
  'ssh': {
    description: 'OpenSSH SSH client (remote login program)',
    example: 'ssh user@hostname',
    automation: 'I can manage your SSH connections and create aliases for frequent connections.'
  },
  'curl': {
    description: 'Transfer data from or to a server',
    example: 'curl https://api.example.com/data',
    automation: 'Try "api-test url" for complete API testing with formatted output and status codes.'
  },
  'docker': {
    description: 'Docker container management',
    example: 'docker ps',
    automation: 'I can help automate common Docker workflows and suggest optimizations.'
  },
  'git': {
    description: 'Distributed version control system',
    example: 'git commit -m "message"',
    automation: 'Try "gitflow feature start <name>" for simplified Git Flow operations.'
  },
};

// Helper functions
const getHelp = (): string => {
  let helpText = 'Available commands:\n\n';
  
  // Basic terminal commands
  helpText += 'System Commands:\n';
  helpText += '  help              Show this help message\n';
  helpText += '  clear             Clear the terminal screen\n';
  helpText += '  exit              Exit the terminal (simulated)\n\n';
  
  // AI Assistant specific commands
  helpText += 'AI Assistant Commands:\n';
  helpText += '  learn <command>   Learn about a terminal command\n';
  helpText += '  automate <task>   Get automation suggestions for a task\n';
  helpText += '  explain <command> Explain a complex command\n';
  helpText += '  search-files <pattern> Enhanced file search\n';
  helpText += '  smart-search <keyword> Context-aware search\n';
  helpText += '  findfiles <type> [modified:<timeframe>] Find files with smart filtering\n';
  helpText += '  netcheck <domain> Comprehensive network connectivity check\n';
  helpText += '  api-test <url> Test API endpoints with formatted results\n';
  helpText += '  gitflow <command> <args> Simplified Git Flow operations\n\n';
  
  helpText += 'For any other command, I\'ll try to provide information and automation suggestions.\n';
  
  return helpText;
};

const learnCommand = (command: string): string => {
  const normalizedCommand = command.trim().split(' ')[0];
  
  if (commandDatabase[normalizedCommand]) {
    const cmd = commandDatabase[normalizedCommand];
    let response = `Command: ${normalizedCommand}\n\n`;
    response += `Description: ${cmd.description}\n\n`;
    response += `Example usage: ${cmd.example}\n\n`;
    
    if (cmd.automation) {
      response += `Automation tip: ${cmd.automation}`;
    }
    
    return response;
  }
  
  return `I don't have information about "${normalizedCommand}" in my database yet. \nYou can try a web search or ask me to explain what you're trying to accomplish.`;
};

const automateTask = (task: string): string => {
  const tasks: Record<string, string> = {
    'port scanning': `I can automate port scanning with: 

smart-scan <target> [options]

This will:
1. Perform initial recon
2. Identify open ports
3. Detect services
4. Generate a formatted report
5. Suggest follow-up actions

Example: smart-scan 192.168.1.0/24 --stealth`,

    'web scraping': `For web scraping automation, use:

scrape <url> [--selector="css selector"] [--pages=N] [--output=format]

Example: scrape https://example.com --selector=".article h2" --pages=5 --output=json

This handles:
- Request throttling
- User-agent rotation
- Following pagination
- Structured data extraction`,

    'log analysis': `For automated log analysis, try:

loganalyze <file> [--pattern="regex"] [--timeframe="start-end"] [--visualize]

Example: loganalyze /var/log/apache2/access.log --pattern="404|500" --timeframe="today" --visualize

This provides:
- Pattern matching
- Time-based filtering
- Statistical analysis
- Visual representations of findings`,

    'backup': `I can automate backups with:

smart-backup <source> <destination> [--schedule="cron expression"] [--compress] [--encrypt]

Example: smart-backup ~/projects /mnt/backup --schedule="0 0 * * *" --compress --encrypt

Features:
- Incremental backups
- Compression
- Encryption
- Scheduled execution
- Verification`,
  };

  const lowercaseTask = task.toLowerCase();
  
  for (const [key, response] of Object.entries(tasks)) {
    if (lowercaseTask.includes(key)) {
      return response;
    }
  }

  return `I don't have a specific automation workflow for "${task}" yet, but I can help you build one. What specific steps are involved in this task?`;
};

export const processCommand = (command: string): string => {
  // Extract the base command (the first word)
  const parts = command.trim().split(' ');
  const baseCommand = parts[0].toLowerCase();
  const args = parts.slice(1).join(' ');
  
  // Process based on command
  switch (baseCommand) {
    case 'help':
      return getHelp();
      
    case 'clear':
      return 'Terminal cleared.';
      
    case 'exit':
      return 'This is a simulated terminal. In a real terminal, this would exit the application.';
      
    case 'learn':
      if (!args) return 'Please specify a command to learn about. Example: learn grep';
      return learnCommand(args);
      
    case 'automate':
      if (!args) return 'Please specify a task to automate. Example: automate backup';
      return automateTask(args);
      
    case 'explain':
      if (!args) return 'Please specify a command to explain. Example: explain find . -type f -name "*.js" | xargs grep "function"';
      return `Breaking down the command: ${args}\n\n` +
        `This is a simulated explanation. In a real implementation, I would parse the command structure and explain each component in detail, along with providing alternatives and optimization suggestions.`;
      
    case 'search-files':
      return `Searching for files matching pattern: "${args}"\n\n` +
        `[This is a simulated result]\n` +
        `Found 5 matches in 3 directories:\n` +
        `./src/utils/helper.js\n` +
        `./src/components/Search.js\n` +
        `./tests/utils/helper.test.js\n` +
        `./dist/utils/helper.min.js\n` +
        `./dist/components/Search.min.js`;
      
    case 'smart-search':
      return `Smart searching for keyword: "${args}"\n\n` +
        `[This is a simulated result]\n` +
        `Results by context:\n\n` +
        `📄 Code occurrences:\n` +
        `  - function searchByKeyword(${args}) in ./src/utils/search.js:24\n` +
        `  - const ${args}Results = [...] in ./src/components/Results.js:12\n\n` +
        `📝 Documentation:\n` +
        `  - "${args} API" mentioned in ./docs/api.md\n\n` +
        `🔄 Git history:\n` +
        `  - "Add ${args} functionality" in commit a1b2c3d`;
      
    case 'findfiles':
      return `Finding files with criteria: "${args}"\n\n` +
        `[This is a simulated result]\n` +
        `Found 12 matching files:\n` +
        `Recently modified:\n` +
        `  ./config/settings.js (2 hours ago)\n` +
        `  ./src/app.js (3 hours ago)\n` +
        `Frequently accessed:\n` +
        `  ./src/utils/helpers.js (accessed 24 times today)\n` +
        `  ./data/schema.json (accessed 15 times today)`;
      
    case 'netcheck':
      return `Checking connectivity to: ${args}\n\n` +
        `[This is a simulated result]\n` +
        `✅ DNS Resolution: Successful (123.45.67.89)\n` +
        `✅ ICMP Echo (Ping): 23ms average\n` +
        `✅ TCP Ports: 80, 443 open\n` +
        `✅ HTTP Status: 200 OK\n` +
        `✅ TLS: Valid certificate (expires in 245 days)\n` +
        `✅ Traceroute: 8 hops, no packet loss`;
      
    case 'api-test':
      return `Testing API endpoint: ${args}\n\n` +
        `[This is a simulated result]\n` +
        `GET ${args}\n` +
        `Status: 200 OK\n` +
        `Time: 156ms\n` +
        `Content-Type: application/json\n\n` +
        `Response preview:\n` +
        `{\n` +
        `  "success": true,\n` +
        `  "data": {\n` +
        `    "items": [...],\n` +
        `    "count": 42\n` +
        `  }\n` +
        `}`;
      
    case 'gitflow':
      return `Executing GitFlow command: ${args}\n\n` +
        `[This is a simulated result]\n` +
        `✅ Created new feature branch 'feature/${args.split(' ')[2]}'\n` +
        `✅ Set upstream to origin\n` +
        `✅ Created initial commit\n` +
        `\n` +
        `You're now working on branch feature/${args.split(' ')[2]}\n` +
        `When finished, use 'gitflow feature finish ${args.split(' ')[2]}'`;
      
    // For any other command, provide information or suggestion
    default:
      if (commandDatabase[baseCommand]) {
        return `Command: ${baseCommand}\n\n` +
          `${commandDatabase[baseCommand].description}\n\n` +
          `Example: ${commandDatabase[baseCommand].example}\n\n` +
          `I can provide more details with: learn ${baseCommand}\n\n` +
          (commandDatabase[baseCommand].automation ? 
            `Automation tip: ${commandDatabase[baseCommand].automation}` : 
            `You can ask me to automate tasks related to ${baseCommand} with: automate <task>`);
      } else {
        return `Command not recognized: ${baseCommand}\n\n` +
          `I'm a simulated terminal AI assistant. In a real implementation, I would:\n` +
          `1. Try to interpret unknown commands\n` +
          `2. Suggest similar commands you might have meant\n` +
          `3. Offer to create automation scripts for recurring tasks\n\n` +
          `Type 'help' to see available commands.`;
      }
  }
};