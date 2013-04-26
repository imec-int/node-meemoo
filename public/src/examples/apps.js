$(function(){
  
  var exampleApps = [
    // {"info":{"title":"hackable clock 0.1","author":"forresto","description":"hackable clock for summer code party 2012","url":"hackableclock"},"nodes":[{"src":"http://forresto.github.com/meemoo-camcanvas/onionskin.html","x":128,"y":45,"z":0,"w":363,"h":304,"state":{"quality":75,"width":320,"height":240},"id":1},{"src":"/image/combine.html","x":707,"y":94,"z":0,"w":386,"h":359,"state":{"scaleX":0.5,"scaleY":0.5,"translateX":0,"translateY":0,"rotate":0},"id":10}],"edges":[{"source":[1,"image"],"target":[10,"foreground"]}]},
    // {"info":{"title":"TEEESSSSSSTTTTT","author":"forresto","description":"native node test","url":"TEEESSSSSSTTTTT"},"nodes":[{"src":"meemoo:image/combine","x":109,"y":148,"z":0,"w":80,"h":60,"state":{},"id":1}],"edges":[]},
    {"info":{"author":"automata","title":"meemoo intro","description":"Meemoo introduction","parents":["https://gist.github.com/3282702","https://gist.github.com/5110822"],"url":"intro"},"nodes":[{"src":"http://automata.github.com/meemoo-intro/introduction.html","x":187,"y":65,"z":0,"w":405,"h":329,"state":{},"id":0},{"src":"http://automata.github.com/meemoo-intro/switch.html","x":82,"y":466,"z":0,"w":200,"h":210,"state":{},"id":1},{"src":"http://automata.github.com/meemoo-intro/lamp.html","x":484,"y":462,"z":0,"w":469,"h":238,"state":{},"id":2}],"edges":[]},
    {"info":{"title":"cam to gif","author":"forresto","description":"webcam to animated gif","url":"cam2gif"},"nodes":[{"src":"http://forresto.github.com/meemoo-camcanvas/onionskin.html","x":412,"y":56,"w":415,"h":348,"state":{"quality":75,"width":400,"height":300},"id":1,"z":0},{"src":"http://forresto.github.com/meemoo-canvas2gif/canvas2gif.html","x":182,"y":468,"w":357,"h":285,"state":{"delay":200,"quality":75,"matte":"#FFFFFF"},"id":3,"z":0},{"src":"http://forresto.github.com/meemoo-modules/imgur.html","x":747,"y":471,"w":357,"h":297,"state":{"title":"meemoo/cam2gif image share","caption":"This image was created with a Meemoo composition. http://meemoo.org/iframework/#/example/cam2gif"},"id":5,"z":0},{"x":1032,"y":83,"src":"meemoo:image/fit","z":0,"w":161,"h":209,"state":{"width":300,"height":300},"id":4},{"x":103,"y":186,"src":"meemoo:ui/button","z":0,"w":133,"h":81,"state":{"label":"add frame"},"id":6}],"edges":[{"source":[3,"gif"],"target":[5,"dataurl"]},{"source":[1,"image"],"target":[4,"image"]},{"source":[4,"image"],"target":[3,"image"]},{"source":[6,"bang"],"target":[1,"capture"]}]},
    {"info":{"title":"cam to macro","author":"forresto","description":"webcam plus two titles","url":"macro"},"nodes":[{"src":"http://forresto.github.com/meemoo-camcanvas/onionskin.html","x":136,"y":65,"z":0,"w":343,"h":280,"state":{"quality":75,"width":320,"height":240},"id":1},{"src":"http://forresto.github.com/meemoo-image/text.html","x":704,"y":423,"z":0,"w":335,"h":257,"state":{"x":"10","y":"220","font":"bold 40px Tahoma","fillcolor":"rgba(255, 255, 255, 0.9)","strokecolor":"black","strokewidth":"2","text":"bottom text"},"id":4},{"src":"http://forresto.github.com/meemoo-image/text.html","x":702,"y":76,"z":0,"w":333,"h":258,"state":{"x":10,"y":40,"font":"bold 30px Tahoma","fillcolor":"rgba(255, 255, 255, 0.9)","strokecolor":"black","strokewidth":1,"text":"top text"},"id":6},{"src":"http://forresto.github.com/meemoo-modules/imgur.html","x":683,"y":771,"z":0,"w":353,"h":278,"state":{},"id":3},{"src":"http://forresto.github.com/meemoo-modules/canvas2img.html","x":301,"y":780,"z":0,"w":116,"h":99,"state":{"quality":0.8,"compress":true},"id":5}],"edges":[{"source":[1,"image"],"target":[6,"background"]},{"source":[6,"image"],"target":[4,"background"]},{"source":[4,"image"],"target":[5,"image"]},{"source":[5,"dataurl"],"target":[3,"dataurl"]}]},
    {"info":{"title":"cam to aviary to gif","author":"forresto","description":"webcam to animated gif","url":"aviary"},"nodes":[{"src":"http://forresto.github.com/meemoo-camcanvas/onionskin.html","x":106,"y":71,"z":0,"w":343,"h":280,"state":{"quality":75,"width":320,"height":240},"id":1},{"src":"http://forresto.github.com/meemoo-canvas2gif/canvas2gif.html","x":136,"y":442,"z":0,"w":357,"h":285,"state":{"delay":200,"quality":75},"id":3},{"src":"http://forresto.github.com/meemoo-modules/imgur.html","x":706,"y":683,"z":0,"w":357,"h":297,"state":{"title":"meemoo/cam2gif image share","caption":"This image was created with a Meemoo composition. http://meemoo.org/iframework/#/example/cam2gif"},"id":4},{"src":"http://forresto.github.com/meemoo-image/aviary.html","x":587,"y":70,"z":0,"w":761,"h":549,"state":{},"id":2}],"edges":[{"source":[3,"gif"],"target":[4,"dataurl"]},{"source":[1,"image"],"target":[2,"image"]},{"source":[2,"image"],"target":[3,"image"]}]},
    // {"info":{"title":"cam to canvas","author":"forresto","description":"webcam to canvas","url":"cam"},"nodes":[{"src":"http://forresto.github.com/meemoo-modules/metronome.html","x":205,"y":43,"w":200,"h":100,"state":{"bpm":60},"id":1},{"src":"http://forresto.github.com/meemoo-camcanvas/webcam2canvas.html","x":608,"y":43,"w":339,"h":516,"state":{"quality":75,"width":320,"height":240},"id":2},{"src":"http://forresto.github.com/meemoo-modules/reflow.html","x":199,"y":245,"w":256,"h":297,"state":{},"id":3}],"edges":[{"source":[1,"beat"],"target":[2,"capture"]},{"source":[2,"image"],"target":[3,"image"]}]},
    {"info":{"title":"cam to glitch","author":"forresto","description":"webcam to jpg to glitch","url":"glitch"},"nodes":[{"src":"http://forresto.github.com/meemoo-modules/metronome.html","x":139,"y":45,"w":200,"h":100,"state":{"bpm":150},"id":1},{"src":"http://forresto.github.com/meemoo-camcanvas/webcam2jpg.html","x":581,"y":49,"w":339,"h":283,"state":{"quality":20,"width":320,"height":240},"id":2},{"src":"http://forresto.github.com/meemoo-jpgglitch/jpgglitch.html","x":138,"y":220,"w":339,"h":262,"state":{},"id":4},{"src":"http://forresto.github.com/meemoo-modules/img2canvas.html","x":282,"y":559,"w":116,"h":98,"state":{},"id":5},{"src":"http://forresto.github.com/meemoo-modules/reflow.html","x":646,"y":398,"w":256,"h":297,"state":{},"id":3}],"edges":[{"source":[1,"beat"],"target":[2,"capture"]},{"source":[2,"jpg"],"target":[4,"jpg"]},{"source":[5,"image"],"target":[3,"image"]},{"source":[4,"jpg"],"target":[5,"dataurl"]}]},
    {"info":{"title":"processing dot js","author":"forresto","description":"processing to reflow","url":"processing"},"nodes":[{"src":"http://forresto.github.com/meemoo-modules/metronome.html","x":147,"y":44,"w":230,"h":110,"state":{"bpm":140,"start":true},"id":1},{"src":"http://forresto.github.com/meemoo-modules/processing.html","x":148,"y":246,"w":308,"h":348,"state":{"code":"void setup() { size(300, 300); colorMode(HSB, 360, 100, 300); noStroke(); background(0); } \n void mousePressed () { fill(random(360), 180, 300); triangle(random(width), random(height), 100, 100, 200, 200);}"},"id":3},{"src":"http://forresto.github.com/meemoo-modules/reflow.html","x":630,"y":88,"w":449,"h":199,"state":{},"id":4},{"src":"http://forresto.github.com/meemoo-modules/reflow.html","x":686,"y":384,"w":440,"h":204,"state":{},"id":5}],"edges":[{"source":[1,"beat"],"target":[3,"pressed"]},{"source":[3,"image"],"target":[4,"image"]},{"source":[1,"beat"],"target":[3,"send"]}]},
    {"info":{"title":"doodle flipbook","author":"forresto","description":"paint doodle to image array to animated gif","url":"flipbook"},"nodes":[{"src":"http://forresto.github.com/meemoo-paint/paint.html","x":132,"y":45,"w":377,"h":342,"state":{},"id":1},{"src":"http://forresto.github.com/meemoo-modules/canvasarray.html","x":760,"y":401,"w":348,"h":290,"state":{},"id":3},{"src":"http://forresto.github.com/meemoo-canvas2gif/canvas2gif.html","x":702,"y":43,"w":354,"h":291,"state":{"delay":200,"quality":75,"matte":"#FFFFFF"},"id":2},{"src":"http://forresto.github.com/meemoo-modules/imgur.html","x":1275,"y":81,"w":357,"h":297,"state":{"title":"meemoo/flipbook image share","caption":"This image was created with a Meemoo composition. http://meemoo.org/iframework/#/example/flipbook"},"id":6}],"edges":[{"source":[1,"image"],"target":[1,"tracing"]},{"source":[1,"image"],"target":[2,"image"]},{"source":[1,"image"],"target":[3,"image"]},{"source":[3,"image"],"target":[2,"image"]},{"source":[2,"gif"],"target":[6,"dataurl"]}]},
    {"info":{"title":"cam doodle","author":"forresto","description":"webcam to processing doodle to animated gif","url":"camdoodle"},"nodes":[{"src":"http://forresto.github.com/meemoo-camcanvas/onionskin.html","x":126,"y":43,"w":342,"h":283,"state":{"quality":75,"width":320,"height":240},"id":4},{"src":"http://forresto.github.com/meemoo-paint/paint.html","x":634,"y":53,"w":377,"h":342,"state":{},"id":1},{"src":"http://forresto.github.com/meemoo-canvas2gif/canvas2gif.html","x":125,"y":386,"w":354,"h":341,"state":{"delay":200,"quality":75,"matte":"#FFFFFF"},"id":2},{"src":"http://forresto.github.com/meemoo-modules/imgur.html","x":652,"y":456,"w":357,"h":297,"state":{"title":"meemoo/camdoodle image share","caption":"This image was created with a Meemoo composition. http://meemoo.org/iframework/#/example/camdoodle"},"id":6}],"edges":[{"source":[4,"image"],"target":[1,"image"]},{"source":[1,"image"],"target":[2,"image"]},{"source":[2,"gif"],"target":[6,"dataurl"]}]},
    {"info":{"title":"(speech to) text to speech","author":"forresto","description":"(in chrome, speech to) text to speech","url":"text2speech"},"nodes":[{"src":"http://forresto.github.com/meemoo-modules/speech2text.html","x":162,"y":61,"w":346,"h":98,"state":{},"id":1},{"src":"http://forresto.github.com/meemoo-speak.js/text2speech.html","x":234,"y":221,"w":167,"h":117,"state":{"amplitude":100,"pitch":50,"speed":175,"wordgap":0},"id":2},{"src":"http://forresto.github.com/meemoo-modules/audioarray.html","x":657,"y":227,"w":330,"h":280,"state":{},"id":3}],"edges":[{"source":[2,"info"],"target":[3,"title"]},{"source":[2,"audio"],"target":[3,"audio"]},{"source":[1,"text"],"target":[2,"text"]}]},
    {"info":{"title":"blend mode loop","author":"forresto","description":"webcam to blend mode loop","url":"blendloop"},"nodes":[{"src":"http://forresto.github.com/meemoo-camcanvas/onionskin.html","x":213,"y":43,"z":0,"w":343,"h":280,"state":{"quality":75,"width":320,"height":240},"id":1},{"src":"http://forresto.github.com/meemoo-blend/blend.html","x":734,"y":47,"z":0,"w":320,"h":295,"state":{"mode":"difference"},"id":3},{"src":"http://forresto.github.com/meemoo-modules/metronome.html","x":192,"y":396,"z":0,"w":122,"h":107,"state":{"ms":"100"},"id":5},{"src":"http://forresto.github.com/meemoo-modules/delay.html","x":567,"y":437,"z":0,"w":63,"h":69,"state":{"delay":"1"},"id":4},{"src":"http://forresto.github.com/meemoo-modules/canvasarray.html","x":1228,"y":88,"z":0,"w":536,"h":536,"state":{"mode":"normal","delay":200},"id":6},{"src":"http://forresto.github.com/meemoo-canvas2gif/canvas2gif.html","x":1906,"y":45,"z":0,"w":385,"h":257,"state":{"delay":"100","quality":75,"matte":"#FFFFFF"},"id":7},{"src":"http://forresto.github.com/meemoo-modules/imgur.html","x":1950,"y":366,"z":0,"w":367,"h":330,"state":{"title":"meemoo image share","caption":"http://www.reddit.com/r/meemoo/comments/pbuor/new_module_image_blend_mode/"},"id":8}],"edges":[{"source":[5,"beat"],"target":[1,"capture"]},{"source":[3,"image"],"target":[4,"in"]},{"source":[1,"image"],"target":[3,"over"]},{"source":[4,"out"],"target":[3,"under"]},{"source":[6,"image"],"target":[7,"image"]},{"source":[7,"gif"],"target":[8,"dataurl"]}]},
    {"info":{"title":"hackable digital rainbow clock","author":"forresto","description":"hackable clock for summer code party 2012, digital rainbow version","url":"rainbowclock","appview":12,"parents":["https://gist.github.com/2760122","https://gist.github.com/2923185","https://gist.github.com/2930234"]},"nodes":[{"src":"http://forresto.github.com/meemoo-modules/clock.html","x":33,"y":250,"z":0,"w":140,"h":122,"state":{},"id":3},{"src":"http://forresto.github.com/meemoo-image/text.html","x":982,"y":269,"z":0,"w":263,"h":150,"state":{"x":10,"y":"100","font":"bold 75px Tahoma","strokecolor":"rgba(0, 0, 0, 0.25)","strokewidth":"1","fillcolor":"white"},"id":5},{"src":"http://forresto.github.com/meemoo-modules/string-join.html","x":552,"y":70,"z":0,"w":149,"h":128,"state":{"join":":"},"id":7},{"src":"http://forresto.github.com/meemoo-modules/color-hsla.html","x":553,"y":250,"z":0,"w":157,"h":132,"state":{"saturation":1,"lightness":".75","alpha":".9"},"id":9},{"src":"http://forresto.github.com/meemoo-image/rectangle.html","x":981,"y":47,"z":0,"w":161,"h":174,"state":{"w":"500","h":"500","x":"0","y":"0","stroke":"","strokewidth":"5","color":"rgba(100%, 100%, 100%, 0.025)"},"id":10},{"src":"http://forresto.github.com/meemoo-image/circle.html","x":977,"y":524,"z":0,"w":168,"h":187,"state":{"x":"250","y":"250","r":"240","end":".25","color":"","stroke":"orange","strokewidth":"20","start":"0"},"id":11},{"src":"http://forresto.github.com/meemoo-image/transform.html","x":1886,"y":409,"z":0,"w":175,"h":196,"state":{"scale":1,"clearEvery":false,"rotate":"-0.25"},"id":13},{"src":"http://forresto.github.com/meemoo-image/transform.html","x":1497,"y":394,"z":0,"w":165,"h":176,"state":{"scale":1,"clearEvery":true,"rotate":"-0.25"},"id":14},{"src":"http://forresto.github.com/meemoo-image/circle.html","x":978,"y":767,"z":0,"w":171,"h":189,"state":{"x":250,"y":250,"r":"220","end":1,"color":"","stroke":"red","strokewidth":"20"},"id":16},{"src":"http://forresto.github.com/meemoo-image/circle.html","x":980,"y":1011,"z":0,"w":173,"h":186,"state":{"x":250,"y":250,"r":"200","end":1,"color":"","stroke":"green","strokewidth":"20"},"id":17},{"src":"http://forresto.github.com/meemoo-image/combine.html","x":1466,"y":732,"z":0,"w":519,"h":525,"state":{},"id":12}],"edges":[{"source":[3,"hours"],"target":[7,"string1"]},{"source":[3,"minutes"],"target":[7,"string2"]},{"source":[3,"seconds"],"target":[7,"string3"]},{"source":[3,"secondsPercent"],"target":[9,"hue"]},{"source":[7,"string"],"target":[5,"text"]},{"source":[9,"color"],"target":[5,"fillcolor"]},{"source":[5,"image"],"target":[14,"image"]},{"source":[14,"image"],"target":[13,"image"]},{"source":[10,"image"],"target":[14,"background"]},{"source":[3,"secondsPercent"],"target":[14,"rotate"]},{"source":[3,"hoursPercent"],"target":[11,"end"]},{"source":[3,"minutesPercent"],"target":[16,"end"]},{"source":[3,"secondsPercent"],"target":[17,"end"]},{"source":[13,"image"],"target":[12,"layer1"]},{"source":[11,"image"],"target":[12,"layer2"]},{"source":[16,"image"],"target":[12,"layer3"]},{"source":[17,"image"],"target":[12,"layer4"]}]}
  ];

  Iframework.loadExampleApps(exampleApps);

});
