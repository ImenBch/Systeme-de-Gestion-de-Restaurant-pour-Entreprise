import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {MatButton} from "@angular/material/button";
// @ts-ignore
import { gsap } from "gsap";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements AfterViewInit{
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Your GSAP animations
    gsap.set(this.el.nativeElement.querySelector('svg'), { visibility: 'visible' });

    gsap.to(this.el.nativeElement.querySelector('#headStripe'), {
      y: 0.5,
      rotation: 1,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      duration: 1
    });

    gsap.to(this.el.nativeElement.querySelector('#spaceman'), {
      y: 0.5,
      rotation: 1,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      duration: 1
    });

    gsap.to(this.el.nativeElement.querySelector('#craterSmall'), {
      x: -3,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: 'sine.inOut'
    });

    gsap.to(this.el.nativeElement.querySelector('#craterBig'), {
      x: 3,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: 'sine.inOut'
    });

    gsap.to(this.el.nativeElement.querySelector('#planet'), {
      rotation: -2,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: 'sine.inOut',
      transformOrigin: '50% 50%'
    });

    gsap.to(this.el.nativeElement.querySelectorAll('#starsBig g'), {
      rotation: 'random(-30,30)',
      transformOrigin: '50% 50%',
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    gsap.fromTo(
        this.el.nativeElement.querySelectorAll('#starsSmall g'),
        { scale: 0, transformOrigin: '50% 50%' },
        { scale: 1, transformOrigin: '50% 50%', yoyo: true, repeat: -1, stagger: 0.1 }
    );

    gsap.to(this.el.nativeElement.querySelectorAll('#circlesSmall circle'), {
      y: -4,
      yoyo: true,
      duration: 1,
      ease: 'sine.inOut',
      repeat: -1
    });

    gsap.to(this.el.nativeElement.querySelectorAll('#circlesBig circle'), {
      y: -2,
      yoyo: true,
      duration: 1,
      ease: 'sine.inOut',
      repeat: -1
    });

    gsap.set(this.el.nativeElement.querySelector('#glassShine'), { x: -68 });

    gsap.to(this.el.nativeElement.querySelector('#glassShine'), {
      x: 80,
      duration: 2,
      rotation: -30,
      ease: 'expo.inOut',
      transformOrigin: '50% 50%',
      repeat: -1,
      repeatDelay: 8,
      delay: 2
    });

  }


}
