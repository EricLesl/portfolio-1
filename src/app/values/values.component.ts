import { Component } from '@angular/core';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrl: './values.component.scss'
})
export class ValuesComponent {
  valueBoxes: {}[] = [
    { flipped: false, title: 'Empathy & Inclusivity', description: 'We are constantly looking for new ways to improve our products and services.', innerTitle: "Designing with Heart"},
    { flipped: false, title: 'Psychology Meets Design', description: 'By integrating psychological principles into UX design, I craft intuitive interfaces that cater to the subconscious cues and behaviours of users, creating a natural flow of interaction.', innerTitle: "Mindful Interfaces"},
    { flipped: false, title: 'Unity & Mastery', description: 'I harmonize the art and science of design, bringing together aesthetic appeal and functional mastery to create seamless user experiences that resonate and endure.', innerTitle: "Harmonized Expertise"},
    { flipped: false, title: 'Purpose-Driven Design', description: `My designs are more than just visually striking; they're imbued with intentionality, serving a greater purpose and sparking change in the digital realm and beyond.`, innerTitle: "Intentional Creativity"},
    { flipped: false, title: 'Championed Causes', description: 'I use design as a platform to advocate for causes I believe in, from promoting accessibility to championing environmental sustainability, turning passion into action.', innerTitle: "Advocacy Through Design"},
    { flipped: false, title: 'Enlighten & Inspire', description: 'My goal is to enlighten and inspire, using design as a tool to educate and empower users, encouraging them to see the digital world as a space of limitless potential.', innerTitle: "The Inspirational Spark"},
  ];

  readMoreClick(box: {}){
    box['flipped'] = !box['flipped'];
  }

  boxText(box: {}){
    return box['flipped'] ? box['description'] : 'Read More';
  }

  titletext(box: {}){
    return box['flipped'] ? box['innerTitle']: box['title'];
  }
}
