import { Component, OnInit } from '@angular/core';
import { user } from '../../../interface/user.interface';
import { GameService } from '../../../service/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  userName: string = localStorage.getItem('userName') || '';

  user: user = {
    user: '',
    wins: 0,
    losses: 0,
    total: 0
  }

  selectionMessage: string = '';
  message: string = '';

  previousComputer: string = '';
  computerSelection: string = '';

  actualMatch: string = '';

  choices: string[] = ['Rock', 'Paper', 'Scissor'];

  isCalling: boolean = false;

  constructor(private gameService: GameService) {

  }

  async ngOnInit() {

    this.user = await this.gameService.readUser(this.userName);

    this.saveGame();

  }


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
    this.user.wins++;
    this.message = "You win!";
  }

  lose() {
    this.user.losses++;
    this.message = "You lose!";
  }

  tie() {
    this.message = "It's a tie!";
  }

  game(playerChoice: string) {

   this.isCalling = true;

    this.selectionMessage = "USER: " + playerChoice + " - COMPUTER: ...";

    setTimeout(() => {

      this.computerSelection = this.selectedComputer();

      this.selectionMessage = "USER: " + playerChoice + " - COMPUTER: " + this.computerSelection;
      this.actualMatch = playerChoice + this.computerSelection;

      switch (this.actualMatch) {
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

      this.user.total++;

      this.saveGame();

      this.isCalling = false;

    }, 1000);

  }

  saveGame() {

    this.gameService.addUser(this.user);

  }

}
