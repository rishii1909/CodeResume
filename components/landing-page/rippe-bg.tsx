import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const fitElementToParent = (el: HTMLElement, padding: number = 0): void => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  function resize(): void {
    if (timeout) clearTimeout(timeout);
    anime.set(el, { scale: 1 });
    const pad: number = padding || 0;
    const parentEl: HTMLElement = el.parentNode as HTMLElement;
    const elOffsetWidth: number = el.offsetWidth - pad;
    const parentOffsetWidth: number = parentEl.offsetWidth;
    const ratio: number = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(() => anime.set(el, { scale: ratio }), 10);
  }

  resize();
  window.addEventListener('resize', resize);
};

const StaggerVisualizer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const staggerVisualizerEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!staggerVisualizerEl.current) return;

    const dotsWrapperEl: HTMLElement = staggerVisualizerEl.current.querySelector(
      '.dots-wrapper'
    ) as HTMLElement;

    const grid: [number, number] = [20, 20];
    const cell: number = 55;
    const numberOfElements: number = grid[0] * grid[1];
    let animation: anime.AnimeTimelineInstance | undefined;
    let index: number = anime.random(0, numberOfElements - 1);
    let nextIndex: number = 0;
    let paused: boolean = true;

    fitElementToParent(staggerVisualizerEl.current, 0);

    const dotsFragment: DocumentFragment = document.createDocumentFragment();
    for (let i = 0; i < numberOfElements; i++) {
      const dotEl: HTMLElement = document.createElement('div');
      dotEl.classList.add(
        'dot',
        'relative',
        'z-10',
        'w-[23px]',
        'h-[23px]',
        'm-[16px]',
        'bg-[#283040]',
        'rounded-full',
        'opacity-5'
      );
      dotsFragment.appendChild(dotEl);
    }
    dotsWrapperEl.appendChild(dotsFragment);

    anime.set('.stagger-visualizer .cursor', {
      translateX: anime.stagger(-cell, { grid, from: index, axis: 'x' }),
      translateY: anime.stagger(-cell, { grid, from: index, axis: 'y' }),
      translateZ: 0,
      scale: 1.5,
    });

    function play(): void {
      paused = false;
      if (animation) animation.pause();

      nextIndex = anime.random(0, numberOfElements - 1);

      animation = anime
        .timeline({
          easing: 'easeInOutQuad',
          complete: play,
        })
        .add({
          targets: '.stagger-visualizer .cursor',
          keyframes: [
            { scale: 2, duration: 200 },
            { scale: 0.8, duration: 200 },
            { scale: 1.4, duration: 400 },
          ],
          // duration: 100,
        })
        .add(
          {
            targets: '.stagger-visualizer .dot',
            keyframes: [
              {
                translateX: anime.stagger('-2px', { grid, from: index, axis: 'x' }),
                translateY: anime.stagger('-2px', { grid, from: index, axis: 'y' }),
                scale: anime.stagger([0, 1], { grid, from: index }),
                opacity: anime.stagger([1, 0], { grid, from: index }), // Stagger opacity
                duration: 200,
              },
              {
                translateX: anime.stagger('4px', { grid, from: index, axis: 'x' }),
                translateY: anime.stagger('4px', { grid, from: index, axis: 'y' }),
                scale: anime.stagger([1.2, 1], { grid, from: index }),
                opacity: anime.stagger([1, 0], { grid, from: index }), // Stagger opacity
                duration: 400,
              },
              {
                translateX: 0,
                translateY: 0,
                scale: anime.stagger([1, 0], { grid, from: index }),
                opacity: anime.stagger([1, 0], { grid, from: index }), // Stagger opacity
                duration: 1000,
              },
            ],
            delay: anime.stagger(80, { grid, from: index }),
          },
          30
        )

        .add(
          {
            targets: '.stagger-visualizer .cursor',
            translateX: { value: anime.stagger(-cell, { grid, from: nextIndex, axis: 'x' }) },
            translateY: { value: anime.stagger(-cell, { grid, from: nextIndex, axis: 'y' }) },
            scale: 1.5,
            easing: 'cubicBezier(.075, .2, .165, 1)',
          },
          '-=800'
        );

      index = nextIndex;
    }

    play();

    // Cleanup the event listener when component is unmounted
    // return () => {
    //   window.removeEventListener('resize', () => resize);
    // };
  }, []);

  return (
    <div className="animation-wrapper min-w-full min-h-screen h-[1520px] relative ">
      <div
        ref={staggerVisualizerEl}
        className="stagger-visualizer absolute w-[1100px] origin-top-left opacity-10"
        // style={{ paddingBottom: '400px' }}
      >
        <div className="cursor absolute top-0 left-0 w-[37px] h-[37px] m-[9px] border-double border-8 border-slate-500 bg-slate-200 rounded-full"></div>
        <div className="dots-wrapper absolute top-0 left-0 w-full h-full flex flex-wrap justify-center items-center transform-z-0"></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-start items-center flex-col p-2 ">
        {children}
      </div>
    </div>
  );
};

export default StaggerVisualizer;
