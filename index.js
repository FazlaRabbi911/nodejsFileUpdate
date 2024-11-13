const { isUtf8 } = require('buffer');
const fs = require('fs/promises');

(async () => {
  const indexPath = './index.html';
  const fspromisjustwatch = await fs.open('./myfile.text', 'r');
  // const size = (await fspromisjustwatch.stat()).size;
  
  fspromisjustwatch.on("change", async function () {
    const size = (await fspromisjustwatch.stat()).size;
    console.log(size)
    const buf = Buffer.alloc(size);
    await fspromisjustwatch.read(buf, 0, buf.byteLength, 0);
    const mytext = buf.toString('utf-8');
    
    let html = await fs.readFile(indexPath, 'utf-8'); // index.html path 

    if (mytext.startsWith('creat banner')) {
      
      // Insert content before the closing </body> tag
      const updatedHtml = html.replace(
        '</body>\n</html>',
        '<div class="header"><h1>My Website</h1><p>A website created by me.</p>\n</div>\n</body>\n</html>'
      );
      await fs.writeFile(indexPath, updatedHtml, 'utf-8');
      console.log('banner added');
    }else if(mytext.startsWith('remove banner')){
      // Use regular expression to match and remove the banner more flexibly
      const bannerRegex = /<div class="header">.*?<\/div>\s*/gs; 
      //	The .*? is a non-greedy match to select everything between <div class="header"> and </div>, even across multiple lines.
      //	The \s* part matches any trailing whitespace or line breaks.
      //	The g flag ensures that the replacement occurs globally (for all instances).
      //	The s flag makes . match newline characters, allowing it to match multi-line content.
      const updatedHtml = html.replace(bannerRegex, '');
      await fs.writeFile(indexPath, updatedHtml, 'utf-8');
      console.log('Banner removed');
    }else if (mytext.startsWith('creat nav')) {
      
      // Insert content before the closing </body> tag
      const updatedHtml = html.replace(
        '</body>\n</html>',
        '<div class="navbar">' +
        '<a href="#">Link</a>' +
        '<a href="#">Link</a>' +
        '<a href="#">Link</a>' +
        '<a href="#" class="right">Link</a>' +
        '</div>\n</body>\n</html>'
      );
      await fs.writeFile(indexPath, updatedHtml, 'utf-8');
      console.log('banner added');
    }else if(mytext.startsWith('remove nav')){
      // Use regular expression to match and remove the banner more flexibly
      const bannerRegex = /<div class="navbar">.*?<\/div>\s*/gs; 
      //	The .*? is a non-greedy match to select everything between <div class="header"> and </div>, even across multiple lines.
      //	The \s* part matches any trailing whitespace or line breaks.
      //	The g flag ensures that the replacement occurs globally (for all instances).
      //	The s flag makes . match newline characters, allowing it to match multi-line content.
      const updatedHtml = html.replace(bannerRegex, '');
      await fs.writeFile(indexPath, updatedHtml, 'utf-8');
      console.log('Banner removed');
    }else if (mytext.startsWith('creat about section')) {
      const updatedHtml = html.replace(
        '</body>\n</html>',
        
        `<div class="row">
            <div class="side">
              <h2>About Me</h2>\n
              <h5>Photo of me:</h5>\n
              <div class="fakeimg" style="height:200px;">Image</div>\n
              <p>Some text about me in culpa qui officia deserunt mollit anim..</p>\n
              <h3>More Text</h3>\n
              <p>Lorem ipsum dolor sit ame.</p>\n
              <div class="fakeimg" style="height:60px;">Image</div>\n<br>
              <div class="fakeimg" style="height:60px;">Image</div>\n<br>
              <div class="fakeimg" style="height:60px;">Image</div>\n
            </div>\n
            <div class="main">
              <h2>TITLE HEADING</h2>\n
              <h5>Title description, Dec 7, 2017</h5>\n
              <div class="fakeimg" style="height:200px;">Image</div>\n
              <p>Some text..</p>\n
              <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>\n
            </div>
        
\n</div>\n</body>\n</html>`
      );
      await fs.writeFile(indexPath, updatedHtml, 'utf-8');
      console.log('banner added');
    }else if(mytext.startsWith('remove about section')){
      // Use regular expression to match and remove the banner more flexibly

      // Explanation:
      // [\s\S] matches any character (including newlines and spaces).
      // *? is the non-greedy match to capture everything between <div class="row"> and </div>.
      // The s flag ensures that newline characters are matched, and the g flag ensures global matching.
      
      const aboutSectionRegex = /<div class="row">[\s\S]*?<div class="main">[\s\S]*?<\/div>\s*<\/div>\s*/g;

      const updatedHtml = html.replace(aboutSectionRegex, '');
      await fs.writeFile(indexPath, updatedHtml, 'utf-8');
      console.log('Banner removed');
    }
  });

  const cctv = fs.watch('./myfile.text');

  for await (let count of cctv) {
    if (count.eventType === 'change') {
      fspromisjustwatch.emit('change');
      console.log("true")
    }
  }

})();