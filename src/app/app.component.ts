import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('mainContent') mainContent: ElementRef;
  listenerRemovalFunction: Function;
  showLouImage = true;
  lilyEmail: string = `LilyanTweddle@gmail.com`;

  constructor(private renderer: Renderer2) {
    gsap.registerPlugin(ScrollToPlugin);
  }
  
  ngAfterViewInit() {
    this.doResize();   
    this.addListener();
  }

  doResize(){
    const sections: NodeListOf<HTMLElement> = this.mainContent.nativeElement.querySelectorAll('.content-section');
    const navItems: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-item');
  
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - this.mainContent.nativeElement.scrollTop;
      const sectionBottom = sectionTop + sectionHeight;
      const mainContentHeight = this.mainContent.nativeElement.clientHeight;
  
      // Calculate the visibility percentage
      let visibleHeight = Math.min(mainContentHeight, sectionBottom) - Math.max(0, sectionTop);
      let visibilityPercentage = (visibleHeight / mainContentHeight) * 100;
  
      // Find the corresponding nav item
      const targetNavItem = Array.from(navItems).find(item => item.getAttribute('data-target') === section.getAttribute('id'));
  
      if (section.getAttribute('id') === 'sectionHome') {
        this.showLouImage = visibilityPercentage >= 50;
      }

      if (visibilityPercentage >= 50) {
        this.renderer.setStyle(targetNavItem, 'flex-grow', '4');
      } else if (sectionBottom <= 0) {
        this.renderer.setStyle(targetNavItem, 'flex-grow', '0.1');
      } else {
        this.renderer.setStyle(targetNavItem, 'flex-grow', '1');
      }
    });
  }
  

  scrollToSection(sectionId: string) {
    const sectionElement = this.mainContent.nativeElement.querySelector(`#${sectionId}`);
    if (sectionElement) {
      // Calculate the target position with 24px space above
      const targetPosition = sectionElement.offsetTop - 24;
  
      gsap.to(this.mainContent.nativeElement, {
        scrollTo: { y: targetPosition, autoKill: false },
        duration: 1.5
      });
    }
  }

  addListener() {
    this.listenerRemovalFunction = this.renderer.listen(this.mainContent.nativeElement, 'scroll', () => {
      this.doResize();
    });
  }
}
