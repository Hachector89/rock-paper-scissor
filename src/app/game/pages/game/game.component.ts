import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  score = {
    computer: 0,
    user: 0
  };

  gamesPlayed: number = 0;
  selectionMessage: string = '';
  message: string = '';
  previousComputer: string = '';
  computerSelection: string = '';
  match: string = '';

  choices: string[] = ['Rock', 'Paper', 'Scissor'];

  selectedComputer() {

    let computerChoice: string = '';
    let randomChoice: number = 0;

    if (this.previousComputer.length == 0) {
      randomChoice = Math.floor(Math.random() * this.choices.length);
      computerChoice = this.choices[randomChoice];
    } else {
      do {
        randomChoice = Math.floor(Math.random() * this.choices.length);
        computerChoice = this.choices[randomChoice];
      } while (this.previousComputer === computerChoice);
    }
    this.previousComputer = computerChoice;

    return computerChoice;
  }

  win() {
    this.score.user++;
    this.message = "You win!";
  }

  lose() {
    this.score.computer++;
    this.message = "You lose!";
  }

  tie() {
    this.message = "It's a tie!";
  }

  game(playerChoice: string) {

    this.selectionMessage = "USER: " + playerChoice + " - COMPUTER: ...";

    setTimeout(() => {

      this.computerSelection = this.selectedComputer();

      this.selectionMessage = "USER: " + playerChoice + " - COMPUTER: " + this.computerSelection;
      this.match = playerChoice + this.computerSelection;

      switch (this.match) {
        case 'RockScissor':
        case 'ScissorPaper':
        case 'PaperRock':
          this.win();
          break;

        case 'ScissorRock':
        case 'RockPaper':
        case 'PaperScissor':
          this.lose();
          break;

        default:
          this.tie();
      }

      this.gamesPlayed++;

    }, 1000);

  }

}
