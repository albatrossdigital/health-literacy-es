var phantom       = require('phantom'),
    system        = require('system'),
    fs            = require("fs"),
    path          = require("path"),
    pages         = ['/'],
    pagesLooking  = [],
    pagesComplete = [];


function crawlPage(url, callback) {
  phantom.create(function createPhantom (ph) {
    ph.createPage(function createPage(page) {
      page.open("http://localhost:9009" + url, function pageOpen(status) {
        if (status == 'success') {
          var delay, checker = (function checkerLoop() {
            page.evaluate(function evaluatePage() {
              var body = document.querySelector('body');
              //console.log(body.getAttribute('data-status'));
              if(body.getAttribute('data-status') == 'ready') {
                var result = {
                  html: document.querySelector('html').outerHTML,
                  pages: []
                }
                // Find links on the page
                var links = document.querySelectorAll("a");
                for(var i = 0; i < links.length; i++) {
                  var href = links[i].getAttribute('href');
                  // We only want simple links "about", "resources", ect
                  if(href && href.indexOf("/") === 0 && href.split("/").length <= 2 && href.split("?").length <= 1) {
                    result.pages.push(href);
                  }
                }
                return result;
              }
              return false;
            }, 
            function handleResults(result) {
              if(result) {
                result.url = url;
                clearTimeout(delay);
                ph.exit();
                callback(result);
              }
            });
          });
          delay = setInterval(checker, 100);
        }
        else {
          callback(false, 'Could not load page');
        }
      });
    });
  });
}

function crawlAll(newPages, callback) {
  pagesLooking = pagesLooking.concat(newPages);
  for(var i = 0; i < newPages.length; i++) {
    var url = newPages[i];
    crawlPage(url, function crawling(result, error) {
      if(error) {
        console.log('Error Processing: ' + error);
      }
      else {
        //console.log(result);
        var filename = result.url == "/" ? '/index' : result.url;
        filename = "./dist/snapshots" + filename + '.html'
        console.log("Writing the snapshot for " + filename + ".");
        // Write the file
        try {
          fs.writeFileSync(filename, result.html);
        } catch(e) {
          console.log(e.stack);
        }
        // fs.writeFileSync(filename, result.html, function writeFile(err) {
        //   if(err) {
        //     console.log('Could not write html file: ' + err);
        //   } else {
        //     console.log("The snapshot for " + filename + " was saved!");
        //   }
        // }); 

        pagesComplete.push(result.url);
        if(result.pages.length) {
          var morePages = result.pages.filter(function(n) {
            return pagesComplete.indexOf(n) < 0 && pagesLooking.indexOf(n) < 0;
          });
          if(morePages.length) {
            crawlAll(morePages, function crawlAllCallback() {
              callback();
            });
          }
        }
      }
    });
  }
}

crawlAll(pages, function callCrawlAll() {
  console.log('done');
});

// var Q = require("q");
// var phantom = require("phantom");
 
// var DomainScraper = function(){ 
    
//   this.createPhantom = function(){  
//     var df = Q.defer();
//     phantom.create(function(ph){
//       df.resolve(ph);
//     });
//     return df.promise;    
//   };
  
//   this.createPage = function(ph){
//     var df = Q.defer();
//     ph.createPage(function(page, err){
//       df.resolve(page);
//     });
//     return df.promise;
//   };
  
//   this.openPage = function(page, url){
//     var df = Q.defer();
//     page.open(url, function(status) {     
//       df.resolve( {page: page, status: status} );
//     });
//     return df.promise;
//   };
  
//   this.screenshotPage = function( url ){
    
//     var domainScraper = this;
//     //var url = "http://" + this.domainList.pop();        
    
//     console.log( "Processing: " + url );
    
//     var val = domainScraper
//     .createPage(domainScraper.ph)
//     .then(function(page){
//       page.set("viewportSize", { width: 1600, height: 790 });
//       return domainScraper.openPage(page, url);
//     }).then(function(obj){
      
//       if( obj.status == "success" ){                      
//         obj.page.render( url + ".png" );        
//         console.log("Rendered " + url);
//       }
      
//       return result;
//     })
//     .done(function(){
//       domainScraper.ph.exit();
//     });
    
//   };
      
  
// };
 
// var ds = new DomainScraper();
// ds.screenshotPage("http://localhost:9000");