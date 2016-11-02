// javascript files

function randomString () {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	var str = '';
	var i = 0;
	for(i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

function Column (name) {
	var self = this;
	this.id = randomString();
	this.name = name;
	this.$element = createColumn();

	function createColumn() {
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').attr({

			'data-toggle' : 'tooltip',
			'data-placement' :'top',
			title: 'Usuń kolumnę' }).text('x');

		var $columnAddCard = $('<button>').addClass('add-card').attr({

			'data-toggle' : 'tooltip',
			'data-placement' :'top',
			title: 'Dodaj kartę' }).text('+');
		
		$columnDelete.click(function () {
			self.removeColumn();
			activateTooltip ();
		});

		$columnAddCard.click(function () {
			self.addCard(new Card(prompt('Wpisz nazwę karty')));
			activateTooltip ();
		});

		$column.append($columnTitle)
			.append($columnDelete)
			.append($columnAddCard)
			.append($columnCardList);

		return $column;
	}

}

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		this.$element.remove();
	}
};

function Card(description) {
	var self = this;

	this.id = randomString();
	this.description = description;
	this.$element = createCard();

	function createCard () {
		var $card = $('<li>').addClass('card');

		var $cardDescription = $('<p>').addClass('card-description').text(self.description);

		var $cardDelete = $('<button>').addClass('btn-delete').attr({

			'data-toggle' : 'tooltip',
			'data-placement' :'right',
			title: 'Usuń kartę'

		}).text('x');
	
		$cardDelete.click(function () {
			self.removeCard();
		});

		$card.append($cardDelete)
			.append($cardDescription);
		return $card;
	}
}

Card.prototype = {
	removeCard: function () {
		this.$element.remove();
	}
};

var board = {
	name: 'Tablica Zadań',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};

function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
}

$('.create-column').click(function () {
	var name = prompt('Wpisz nazwę kolumny');
	var column = new Column(name);
	board.addColumn(column);
	activateTooltip ();
});

var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie');
var doneColumn = new Column('Skończone');

board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

var card1 = new Card('Przykładowa karta');
var card2 = new Card('Karty można przenosić');
var card3 = new Card('Karta numer 3');
var card4 = new Card('Zadanie wykonane');

todoColumn.addCard(card1);
doingColumn.addCard(card2);
doneColumn.addCard(card3);
doneColumn.addCard(card4);

function activateTooltip () {
	$('[data-toggle="tooltip"]').tooltip();
}
activateTooltip();





