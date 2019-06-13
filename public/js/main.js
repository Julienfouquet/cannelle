//-- Order object
var order = {
    origin: null,
    spice: null,
    milk: null,
    chocolate: null,
    sugar: null,
    name: null,

    get: function(attribute) {
      return this[attribute]
    },
    
    set: function(attribute, value) {
      this[attribute] = value;
    },

    getAll: function() {
      return {
        origin: this.origin,
        spice: this.spice,
        milk: this.milk,
        chocolate: this.chocolate,
        sugar: this.sugar
      }
    }, 

    verbose: function() {
      let result = `${this.name} souhaiterai un café ${this.origin}`;

      if(this.spice === null || this.spice === 'sans')
        result += ` sans épice`;
      else
        result += ` avec ${this.spice}`;

      if(this.milk === null)
        result += `, sans lait`;
      else
        result += `, ${this.milk} lait`;

      if(this.chocolate === null)
        result += `, sans chocolat`;
      else
        result += `, ${this.chocolate} chocolat`;

      if(this.sugar === null)
        result += ` & sans sucre.`;
      else
        result += ` & ${this.sugar} sucre.`;

      return result;
    }
}

//-- Step bar
var step = {
  current: 0,
  max: 6,
  stepBar: document.querySelector('.js-steps'),
  initialClass: document.querySelector('.js-steps').classList.value,
  endStep: document.querySelector('.js-endStep'),

  next: function() {
    if(this.current < this.max) {
      this.current++;
      this.addClassName();
    }

    if(this.current === this.max)
      this.endStep.classList.add('isVisible');
  },

  previous: function() {
    if(this.current > 0) {
      this.current--;  
      this.addClassName();
    }    
    this.endStep.classList.remove('isVisible');
  },

  addClassName() {
    this.stepBar.classList.value = this.initialClass + ' step' + this.current;
  }
}

//-- Clicks handler

// Choices
var choices = document.querySelectorAll('.js-choice');

for(let choice of choices) {
  choice.addEventListener('click', () => {
    let kind = choice.parentElement.attributes['data-attribute'].value;
    let userChoice = choice.attributes['data-value'].value;

    if(userChoice !== order.get(kind)) {
      // Increase step only if null
      if(order[kind] === null)
        step.next();

      order.set(kind, userChoice);

      // Classname
      let siblings = choice.parentElement.children;
      for(let child of siblings) {
        child.classList.remove('isSelected');
      }
      choice.classList.add('isSelected');

      // Animate logo
      document.querySelector('.js-logo').classList.add('isAnimated');
      setTimeout(() => {
        document.querySelector('.js-logo').classList.remove('isAnimated');
      }, 200);
    }
    else {
      order.set(kind, null);
      // Classname
      choice.classList.remove('isSelected');
      step.previous();
    }

  }, false);
}

// End
document.querySelector('.js-end').addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();

  fetch('http://localhost:666/order', {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      commande: order.verbose()
    })
  })
  .then(response => {
    if(response.status === 200) { 
      // Clear form
        // Input field
        document.querySelector('.js-name').value = '';
        step.previous();
        order.set('name', '');

        // Choices
        let siblings = document.querySelectorAll('.js-choice.isSelected');
        for(let child of siblings) {
          let kind = child.parentElement.attributes['data-attribute'].value;
          order.set(kind, null);
          child.classList.remove('isSelected');
          step.previous();
        }

      // Animate toast
      document.querySelector('.js-toast-message').innerHTML = `Bonjour ${order.name}, votre commande est passée, enjoy !`;

      document.querySelector('.js-toast').classList.add('isVisible');
      setTimeout(() => {
        document.querySelector('.js-toast').classList.remove('isVisible');
      }, 3000);
    }
  })
  .catch(error => {
    console.log(error)
  })
}, false);

// Keyup, change handler
document.querySelector('.js-name').addEventListener('keyup', (event) => {
  let _name = event.target.value;
  if((order.get('name') === '' || order.get('name') === null) && _name !== '') {
    // Animate logo
    document.querySelector('.js-logo').classList.add('isAnimated');
    setTimeout(() => {
      document.querySelector('.js-logo').classList.remove('isAnimated');
    }, 200);

    step.next();
  } else if(_name === '') {
    step.previous();
  }
  order.set('name', _name);
}, false);