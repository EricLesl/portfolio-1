import { Component, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('mainContent') mainContent: ElementRef;

  constructor(private renderer: Renderer2) { }
  
  ngAfterViewInit() {
    this.doResize();
    
    this.renderer.listen(this.mainContent.nativeElement, 'scroll', () => {
      this.doResize();
    });
  }

  doResize(){
    const sections: NodeListOf<HTMLElement> = this.mainContent.nativeElement.querySelectorAll('.content-section');
    const navItems: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-item');
    const mainContentScrollTop = this.mainContent.nativeElement.scrollTop;
    const mainContentHeight = this.mainContent.nativeElement.clientHeight;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const mainContentHeight = this.mainContent.nativeElement.clientHeight;
      const sectionTop = section.offsetTop - this.mainContent.nativeElement.scrollTop;
      const sectionBottom = sectionTop + sectionHeight;
      
      // Calculate the visibility percentage
      let visibleHeight = Math.min(mainContentHeight, sectionBottom) - Math.max(0, sectionTop);
      let visibilityPercentage = (visibleHeight / mainContentHeight) * 100;

      // Find the corresponding nav item
      const targetNavItem = Array.from(navItems).find(item => item.getAttribute('data-target') === section.getAttribute('id'));

      if (visibilityPercentage >= 50) {
        // Increase nav item height by 100px if section takes up 50% or more of the view
        this.renderer.setStyle(targetNavItem, 'height', '204px');
      } else if ((sectionBottom) <= 0) {
        // If the section has been scrolled past (its bottom is above the viewable area), set nav item height to 50% of its original height
        this.renderer.setStyle(targetNavItem, 'height', '52px');
      } else {
        // Reset to original height otherwise
        this.renderer.setStyle(targetNavItem, 'height', '104px');
      }
    });
  }

  scrollToSection(sectionId: string) {
    const sectionElement = this.mainContent.nativeElement.querySelector(`#${sectionId}`);
    if (sectionElement) {
      // Calculate the top position of the element within the container
      const elementTop = sectionElement.offsetTop;
      // Adjust the position to include the desired space above
      const positionWithSpaceAbove = elementTop - 24;
      // Scroll the main content container to the adjusted position
      this.mainContent.nativeElement.scrollTo({
        top: positionWithSpaceAbove,
        behavior: 'smooth'
      });
    }
  }
}
