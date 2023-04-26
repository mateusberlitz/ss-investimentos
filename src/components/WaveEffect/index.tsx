import gsap, {TweenMax} from 'gsap';
import { useEffect, useRef, useState } from 'react';
import styles from './waveEffect.module.css'

interface Point{
    x:number;
    y: number;
}

interface Wave{
    context: CanvasRenderingContext2D,
    amplitude: number,
    curviness: number,
    duration: number,
    fillStyle: string,
    frequency: number,
    height: number,
    segments: number,
    tweens: Array<TweenMax>,
    waveHeight: number,
    width: number,
    x: number,
    y: number,
    points: Array<Point>,
    init: () => void,
    resize: () => void,
    draw: () => void,
    kill: () => void
}

interface WaveOptions{
    //properties
    amplitude?: number,
    curviness?: number,
    duration?: number,
    fillStyle?: string,
    frequency?: number,
    height?: number,
    points?: [],
    segments?: number,
    tweens?: [],
    waveHeight?: number,
    width?: number,
    x?: number,
    y?: number,
    
    // Methods
    init?: () => void,
    resize?: () => void,
    draw?: () => void,
    kill?: () => void
}

export function WaveEffect(){
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>();
    const [context, setContext] = useState<CanvasRenderingContext2D | null>();
    //let canvas:HTMLCanvasElement;
    //let context: CanvasRenderingContext2D | null;
    //let vw, vh;
    const [waves, setWaves] = useState<Wave[]>([]);
    const [resized, setResized] = useState<Boolean>(false);
    const [resolution, setResolution] = useState(1);
    const [vw, setVw] = useState(1);
    const [vh, setVh] = useState(1);

    useEffect(() => {
        console.log(context);
        if(canvasRef.current && !canvas){
            setCanvas(canvasRef.current);
        }

        if(canvas && !context){
            setContext(canvas.getContext("2d"));
        }

        if(context){
            startAnimation();
            console.log(context);
        }
    }, [canvasRef, canvas]);

    const startAnimation = () => {
            if(canvas && context){
                setResolution(window.devicePixelRatio);

                //let waves = [];

                //let vw, vh;
                resizeCanvas();

                let wave = createWave({
                    amplitude: 50,
                    duration: 4,
                    fillStyle: "rgba(103,58,183,0.8)",
                    frequency: 2.5,
                    width: vw,
                    height: vh,
                    segments: 100,
                    waveHeight: vh * 0.25
                });

                // let wave2 = createWave(context, {
                //     amplitude: 100,
                //     duration: 2,
                //     fillStyle: "rgba(63,81,181,0.7)",
                //     frequency: 1.5,
                //     width: vw,
                //     height: vh,
                //     segments: 100,
                //     waveHeight: vh * 0.25
                // });

                if(wave){
                    
                    setWaves([wave]);

                    console.log(gsap.to(waves, {
                        duration: 10,
                        waveHeight: vh / 2,
                        ease: "sine.inOut",
                        repeat: -1,
                        repeatDelay: 1,
                        yoyo: true
                    }));

                    gsap.to(wave, {
                        duration: 6,
                        amplitude: 10,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true
                    });
                }
                // gsap.to(wave2, {
                //     duration: 7,
                //     amplitude: 25,
                //     ease: "sine.inOut",
                //     repeat: -1,
                //     yoyo: true
                // });

                window.addEventListener("resize", () => {
                    setResized(true);
                });

                gsap.ticker.add(update);
            }

            
        }

    function update() {
        if(context && canvas){
            let len = waves.length;
    
            if (resized) {
                
                resizeCanvas();
                
                for (let i = 0; i < len; i++) {
                    waves[i].resize();
                }
                
                setResized(false);
            }
        
            context.clearRect(0, 0, vw, vh);  
            context.globalCompositeOperation = "soft-light";
            
            for (let i = 0; i < len; i++) {
                waves[i].draw();
            }
        }
    }

function createWave(options?: WaveOptions) {
    let wave:Wave;

    if(context && canvas){
        wave = {
    
            // Properties
            context: context,
            amplitude: options?.amplitude || 200,
            curviness: options?.curviness || 0.75,
            duration: options?.duration || 2,
            fillStyle: options?.fillStyle || "rgba(33,150,243,1)",
            frequency: options?.frequency || 4,
            height: options?.height || 600,
            segments: options?.segments || 100,
            waveHeight: options?.waveHeight || 300,
            width: options?.width || 800,
            x: options?.x || 0,
            y: options?.y || 0,
            points: [],
            tweens: [],
            
            // Methods
            init: init,
            resize: resize,
            draw: draw,
            kill: kill
        };
          
        init();

        return wave;
    }
    
  function kill() {
    
    if(wave.points && wave.tweens){
        let tweens = wave.tweens;
        let len = tweens.length;
        
        for (let i = 0; i < len; i++) {
            tweens[i].kill();
        }
        
        tweens.length = 0;
        wave.points.length = 0;
    }
  }
  
  function init() {
    
    kill();
    
    let segments = wave.segments;
    let interval = wave.width / segments;
    
    for (let i = 0; i <= segments; i++) {
      
      let norm = i / segments;
      let point = {
        x: wave.x + i * interval,
        y: 1
      };
      
      let tween = gsap.to(point, {
        duration: wave.duration,
        y: -1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }).progress(norm * wave.frequency)
      
      wave.tweens.push(tween);
      wave.points.push(point);
    }    
  }
  
  function draw() {

    if(context){
        let points = wave.points;
        let len = points.length;
        
        let startY = wave.waveHeight;
        let height = wave.amplitude / 2;
        
        context.beginPath();    
        context.moveTo(points[0].x, startY + points[0].y * height);
        
        for (let i = 1; i < len; i++) {
        
        let point = points[i];
        context.lineTo(point.x, startY + point.y * height);
        }
        
        context.lineTo(wave.x + wave.width, wave.y + wave.height);
        context.lineTo(wave.x, wave.y + wave.height);
        context.closePath();
        context.fillStyle = wave.fillStyle;
        context.fill();

        console.log(context);
    }
  }
  
  function resize() {
    
    wave.width = vw;
    wave.height = vh;
    
    let points = wave.points;
    let len = points.length;
    let interval = wave.width / wave.segments;
    
    for (let i = 0; i < len; i++) {
      
      let point = points[i];
      point.x = wave.x + i * interval;
    }
  }
}

    function resizeCanvas() {
        if(canvas && context){
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            
            canvas.width  = vw * resolution;
            canvas.height = vh * resolution;
            
            canvas.style.width  = vw + "px";
            canvas.style.height = vh + "px";
            
            context.scale(resolution, resolution);
        }
    }

    return(
        <canvas ref={canvasRef} id="waveEffect" className={styles.waveEffect}></canvas>
    )
}