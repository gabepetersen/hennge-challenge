# Improvements

this documents describes some of the potential improvements, in my opinion, that can be made in both design and functionality.

### Design

- Seperating the Date and Search Fields
    Although the functionality of having the search bar slide from the calendar, some new users might experience slight confusion when using the app at first. With this sliding search functionality, it makes the user have to click extra in order to get the filter configuration that they want. While this design provides an excellent design to make the user feel more in control of the visual interface, quick usabilitiy is the tradeoff here. This also simplifies the maintainability of the component.

- Header Bar Sizing on Mobile
    If we expect the user to use this component's filtering methods a lot, it could be good to resize the calender/text filter combination to cover the full width of the screen in a mobile view. In this layout, the user would have better access to the input fields on screen.

- Different Themes
    I think a dark mode could look pretty cool with this design.

- Link Color
    This is a totally personal opinion, but I think the link hover color stands out too much on the b&w design. 

### Functionality

- Seperate Email Component
    Since the user will want to see the reply chain on emails, it might be good to add a seperate email component that the app can route to from the email. This might make the component a bit more organized when reading through long email chains. 

- Paginator
    Since the mail-archiver might need to display many emails, a paginator, giving the option of how many emails per page, could be a nice feature for the user to customize their own visual interface.

### Some things I added to the existing design 

- Hidden Search Bar
    I figured that a show/hide functionality on the search button was implied, so I made the whole filter bar a flex so that the search bar would appear underneath the calender on mobile view and to the side on desktop view. This is able to filter all fields of the emails, including the message.

- Email Dropdown/Message Inspection
    To display the functionality required by Mission 2, I added a feature so that on the email click, a dropdown would occur to display the email message. One feature that I would like to add in the future is highlighting the matching text on search.

