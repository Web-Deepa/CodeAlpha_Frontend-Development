const display = document.getElementById('display');
        let expr  = '';
      
        let fresh = false;  // true after = is pressed

        function show(val) {
            display.value = val;
        }

        // Initialize displ ay
        show('0');

        function app(val) {
            if (val === '+/-') {
                if (display.value && display.value !== '0') {
                    let n = parseFloat(display.value) * -1;
                    display.value = n;
                    expr = String(n);
                }
                return;
            }
            // After =, typing a number starts fresh; typing an operator continues
            if (fresh && !'+-*/'.includes(val)) {
                expr = '';
                fresh = false;
            }
            fresh = false;
            expr += val;
            show(expr);
        }

        function clr() {
            expr  = '';
            fresh = false;
            show('0');
        }

        function deleteLast() {
            expr = expr.slice(0, -1);
            show(expr || '0');
        }

        function calc() {
            try {
                let result = Function('"use strict"; return (' + expr + ')')();
                result = parseFloat(result.toFixed(10));
                show(result);
                expr  = String(result);
                fresh = true;
            } catch (e) {
                show('Error');
                expr  = '';
                fresh = false;
            }
        }

        
// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if ('0123456789'.includes(key)) {
        app(key);
        event.preventDefault();
    } else if ('+-*/'.includes(key)) {
        app(key);
        event.preventDefault();
    } else if (key === 'Enter') {
        calc();
        event.preventDefault();
    } else if (key === 'Backspace') {
        deleteLast();
        event.preventDefault();
    } else if (key === 'Escape') {
        clr();
        event.preventDefault();
    } else if (key === '.') {
        app('.');
        event.preventDefault();
    } else if (key === '%') {
        app('%');
        event.preventDefault();
    }
});

// Focus the display for keyboard input
display.focus();

