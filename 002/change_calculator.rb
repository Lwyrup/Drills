def changer(amount)
	q = 0
	d = 0
	n = 0
	p = 0

	while 0.24 < amount
		amount = amount - 0.25
		q += 1
	end

	return "#{q} quarters\n#{d} dimes\n#{n} nickels\n#{p}pennies."
end

puts changer(4.17)