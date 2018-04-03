# currencyinput
Make a input field showing human readable currency numbers like 100,000,000.00
Sometimes you are using input fields in a form for large numbers above the 100,000. Then you are counting the zeros if it is correct. This plugin will help you make it more readable. It wil put the thousand sepparators in the number and the decimal point.
You don't have to worry about submitting the form. Behind the input there is the normal input field with the correct number. So, when submitting, you are not submitting the number 100,000,000.00 but you are submitting the number 100000000.00

# usage
Give the input field a class you want, like 'currency-input' and trigger the input like:
$('.currency-input').currencyInputs();

There are some options.
- decimals : default = 2
- dec_point : default = '.'
- thousands_sep : default = ','

So, the javascript trigger could be:

$('.currency-input').currencyInputs({
  'decimals': 3 ,
  'dec_point': ',' ,
  'thousands_sep': '.' 
});
