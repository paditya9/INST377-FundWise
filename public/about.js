if (annyang) {
  let commands = {
      'hi echo how are you': () => alert('Hi! I am doing well, how about you?!'),
      'echo change the color to *color': (color) => document.body.style.backgroundColor = color,
      'echo navigate to *page': (page) => window.location.href = page + '.html'
  };

  annyang.addCommands(commands);
  
  function toggleListening(turnOn) {
    if (turnOn) {
      if (!annyang.isListening()) {
        annyang.start();
        alert('Audio listening turned on.');
      }
    } else {
      if (annyang.isListening()) {
        annyang.abort();
        alert('Audio listening turned off.');
      }
    }
  }
}