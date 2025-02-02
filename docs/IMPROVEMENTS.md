# Improvements

This document describes some of the potential improvements, in my opinion, that can be made in both design and functionality.

### Design

- *Separating the Date and Search Fields*

    Although the functionality of having a hidden search bar does improve the design, some new users might experience slight confusion when using the app at first. With this sliding search functionality, it makes the user have to click extra to get the filter configuration that they want. While this design provides excellent ways to make the user feel more in control of the visual interface, quick usability is the tradeoff here. By separating the form fields, it can also simplify the maintainability of the component.

- *Header Bar Sizing on Mobile*

    If we expect the user to use the filtering methods, either by date range or text, it could be good to resize the calendar/text filter bar to cover the full width of the screen in a mobile view. In this layout, the user would have better access to the input fields on the screen, and it would give it that classic mobile design feel.

- *Different Themes*

    I think a dark mode could look pretty cool with this design. With this, the user has a nice added control to their visual environment.

- *Link Color*

    This is an opinion I'm not completely sure about, but I think the link hover color stands out too much on the b&w design. 

### Functionality

- *Separate Email Component*

    Since the user will want to see the replies on emails, it might be good to add a separate email component that the app can route to from the email list. This could make the component more organized when reading through long email chains. 

- *Paginator*

    Since the mail-archiver might need to display many emails, giving the option of how many emails are displayed per page could be another nice feature for the user to customize their visual interface.

