-- problem 1
SELECT email from customers order by email;

-- problem 2
 SELECT id FROM orders WHERE customer_id IN ( SELECT id FROM customers WHERE fname = 'Elizabeth' AND lname = 'Crocker');

--  problem 3
select sum(num_cupcakes) from orders where processed = false;

-- problem 4
SELECT cupcakes.name, SUM(orders.num_cupcakes) 
FROM cupcakes
LEFT JOIN orders ON cupcakes.id = orders.cupcake_id
GROUP BY cupcakes.name
ORDER BY cupcakes.name;

-- problem 5
SELECT customers.email, SUM(orders.num_cupcakes) AS total
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id
GROUP BY customers.id, customers.email
ORDER BY total DESC;

-- problem 6
SELECT DISTINCT customers.fname, customers.lname, customers.email
FROM customers
JOIN orders ON customers.id = orders.customer_id
JOIN cupcakes ON orders.cupcake_id = cupcakes.id
WHERE cupcakes.name = 'funfetti' AND orders.processed = TRUE;





