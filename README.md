# pas-une-pipe

Detects visual completeness of a webpage.


Logic: 

Gets all visible elements in the viewport within the body tag using Intersection Observer API. 

Waits for time where no dom mutations in Mutation Observer API occur for sustained 500ms. 

Calculate area of all elements. 

Sorts all elements chronologically by time they rendered. 

Starts subtracting last loaded elements until the removed area >= 20% total area. 

If any images/background images haven't loaded (naturalHeight = 0), deduct their area from the total area and count that toward the 20%. 

If that causes the subtracted area to exceed 20%, then wait until those images load.

If any new images load, check if they add back to pass the 20% mark, then stop and record time it loaded.  

If the images never load, then the metric value will be NA (if synthetic test, when test times out | if RUM, when user aborts page or it times out).
