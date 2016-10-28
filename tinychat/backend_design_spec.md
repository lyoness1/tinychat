# tinychat backend developer spec.

## ROUTES
------
* USER opens landing page /index.html
* SERVER prompts user for name
..1. Case 1: USER submits name as a valid (at least one letter) string.
            SERVER routes user to /chat.html, passing: 
                ` {'name': <string>} `
    Case 2: user doesn't submit name and landing page reloads

## EVENTS
------