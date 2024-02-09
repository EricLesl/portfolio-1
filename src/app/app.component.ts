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
  
      if (visibilityPercentage >= 50) {
        // Option 1: Adjust flex-grow to make the item grow
        this.renderer.setStyle(targetNavItem, 'flex-grow', '4'); // Example: make it grow more than others
        // Option 2: Increase padding for visual size change
        // this.renderer.setStyle(targetNavItem, 'padding', '24px'); // Increase padding to simulate larger size
      } else if (sectionBottom <= 0) {
        // Reduce flex-grow or reset padding for items that have been scrolled past
        this.renderer.setStyle(targetNavItem, 'flex-grow', '0.1'); // Example: make it take less space
        // this.renderer.setStyle(targetNavItem, 'padding', '6px'); // Decrease padding to simulate smaller size
      } else {
        // Reset flex-grow and padding to original state for all other items
        this.renderer.setStyle(targetNavItem, 'flex-grow', '1'); // Reset to default flex-grow
        // this.renderer.setStyle(targetNavItem, 'padding', '12px'); // Reset padding to original
      }
    });
  }
  

  scrollToSection(sectionId: string) {
    const sectionElement = this.mainContent.nativeElement.querySelector(`#${sectionId}`);
    if (sectionElement) {
      // Calculate the target position with 24px space above
      const targetPosition = sectionElement.offsetTop - 24;
  
      // Use GSAP to animate to the target position with a bounce effect
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
