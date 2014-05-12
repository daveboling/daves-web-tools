$(document).ready(function () {

	$('.navMenu').slicknav({
		label: '',
		duration: 500,
	});


	//Smooth Scroll
	var $root = $('html, body');
	$('a').click(function(e) {

	$root.animate({
		scrollTop: $( $.attr(this, 'href') ).offset().top
	}, 500);
	return false;
	});

/* 
So how does this code work? No mysteries, right? Right.

First of all, to optimize we're setting $root to html and body. This is so
a new instance isn't called everytime the event is fired. For example, $('html, body').animate() $rather than root.animate()

Now, we're checking for anchor .click() events using jQuery.

Upon click, the html and body will animate, but how is this handled?

We can't just say, "scroll here upon click." Not without a bunch more code, that is. 
Instead, we need to offset() the top by the position of the anchor being clicked.

$( $.attr(this, 'href'))
This bit of code here, uses the jQuery .attr() method which requires two things.
1. An attribute's name
2. the value of that attribute

So, let's say we click the 'Home' anchor with the href of '#Home'.
What two values are grabbed using the $.attr() method?
1. the anchor ID
2. #Home

Because the attr() knows that the attribute is an anchor tag, it will proceed to 
treat it as an anchor tag. However, before it can do that it has to do something else.

It has to animate! So, we use jQuery offset to get the current location and 'offset' it from
the top of the document. We give animate 500ms to reach the end of this animation.

After we're done, we return false. Why you ask? What happens if it were true? Try changing it
to true really quick and you'll see exactly why it's false.

Do you see what's happening? It's very quickly snapping to the link and back and THEN
doing the animation. Why? Think of returning false here as a way of preventDefault();

Try putting preventDefault() method in there and see what happens now!

See that? It's like we've set return to false. Notice, that 'Home' isn't functioning
properly now. Why is it doing that?!

This is where you come in, cause I ain't doin' everything for ya. Based on what this
brief tutorial has taught you, there's something wrong somewhere in the HTML and CSS.

It's your job to find it and fix it. 

No hints. When you click that 'Home' link and it glides up to the top like it's supposed
to, then you'll know you've fixed it. 

Go get em'! 

*/

});



