/*
Query 1
I identified that there is a big discount in store #5. I wanted to identify and
provide some insights on the reasoning behind it. Therefore, I have provided how many total days,
charged days, and free days (including their discounts). I also provided store manager name, VP name,
address, and the tool type/brand. This should be able to provide enough clarity for a discussion.
I included 3 calculations detailing profit and dollar numbers so that the team can discuss.
If I were to make this into a dashboard, I would be able to provide comparison to see if we are
charging enough or not. I would also Google to have some metric identifying how we compete against
competitors within similar regions and business. I would also create a graph to show maximum profit
possible and identify where that specific store is in terms of performance.

Please note I noticed there is a Charge table, however, I prefer to use the available data
from rentals because it gives very clear indication of days and discount. Charge table
does not give the full picture because there is a lack ofend dates as well. Because this is a take
home assignment, I would also ask if this was an additional charge, similar to service/membership
fee (on top of the equipment rental fee).
*/
Select
a.STORE_PID,
    a.TOTAL_DAYS,
    a.CHARGED_DAYS,
    a.FREE_DAYS,
    a.DISCOUNT_AMT,
    a.DISCOUNT_PCNT,
    b.STORE_MANAGER_NAME,
    b.STORE_VP_NAME,
    b.STORE_CITY,
    b.STORE_STATE,
    b.STORE_REGION,
    c.TOOL_TYPE,
    c.TOOL_BRAND,
    (a.RENTAL_AMT - DISCOUNT_AMT) * CHARGED_DAYS As TotalProfit,
        (a.RENTAL_AMT * a.TOTAL_DAYS) As MAX_PROFIT_POSSIBLE,
            (a.FREE_DAYS * a.RENTAL_AMT) + (a.CHARGED_DAYS * DISCOUNT_AMT) As DOLLAR_AMOUNT_DISCOUNT
From Rentals a
Inner Join Store b
on a.STORE_PID = b.STORE_PID
And a.STORE_PID = 5 --if i do the join here, it will perform better because the where
--statement will run first, then use the where statement
Left Join Tool c
on a.TOOL_PID = c.TOOL_PID

/* Query 2
For this query, I wanted to do something a little bit different. I checked the numbers and
I do not think that they match. I specified TOOL_PID 1 to give an example
To start off:
1) Total days is 8, charged days is also 8, however, free days is 1, there is an
inconsistency in the numbers.
2) I assumed in the first question that the rental amount is per day basis, however, if I were to
assume that rental amount is the total amount, then the charge amount still would not make sense.
Here is my math to follow along: (CHARGED_DAYS * CHARGE_AMT) - DISCOUNT_AMT
(7 days * $1.99) - $3.99= $13.93 - $3.99 = $9.94.

My assumption could be off, however, I do believe that there is a miscalulation in these tables.
I would love to be able to discuss and confirm before moving on.

My initial query was meant to identify tool pricing and region. I noticed that different state and
different cities have the same pricing, which I find a bit irregular-- there's probably room to
adjust pricing to make it more competitive. I would clean up the data before presenting these
findings to the CEO.
*/

Select
a.TOOL_PID,
    a.CHARGE_PID,
    a.RENTAL_AMOUNT, --15.95
a.TOTAL_DAYS, --8
a.CHARGED_DAYS, --8
a.FREE_DAYS, --1
a.DISCOUNT_AMT, --3.99
b.TOOL_TYPE, --Ladder
b.TOOL_BRAND, --Werner
c.CHARGE_AMT, --$1.99
a.STORE_PID,
    d.STORE_CITY,
    d.STORE_STATE
From Rental a
Inner Join Tool b
on a.TOOL_PID = b.TOOL_PID
And a.TOOL_PID = 1
Left Join Charge c
on a.CHARGE_PID = c.CHARGE_PID
Left Join Store d
on a.STORE_PID = d.STORE_PID


/* Query 3
I'm assuming Rental's CHECKOUT_DATE_PID is a correct join to DATE_PID from Date dimension
I'm also assuming rental_amt is the total for each transaction
*/

Select
a.Rental_Amt,
    a.Rental_Amt / sum(a.Rental_Amt)
over(partition by STORE_STATE, DATE_FISCAL_QUARTER) As Percent_Of_State_Quarter,
    /*
    above gives percentage of the rental amt compared to state/quarter. we could also do this based
    on just quarter or state alone to give more significant numbers. this helps break down the nitty gritty
    while my other suggestion gives an overall view. we could combine this method with discounts
    or anything else given the metrics provided
    */
    sum(a.Rental_Amt)
over(partition by STORE_STATE, DATE_FISCAL_QUARTER) as total_state_by_quarter,
    /*
    this is the total number (denominator for the above calculation) based on state/quarter split
    */
    b.DATE_FISCAL_QUARTER,
    c.STORE_STATE
From Rental a
Left Join Data b
on a.CHECKOUT_DATE_PID = b.DATE_PID
Left Join Store c
on a.STORE_PID = c.STORE_PID