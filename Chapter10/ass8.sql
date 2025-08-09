-- 1. 
select presi_lastname from president
where cast(presi_yearofnomination as integer) > 1988

-- 2.
select firstlady_firstname from firstlady
where firstlady_firstname like 'M%'

-- 3. 
select firstlady_birthplace, count(*) from firstlady
where firstlady_birthplace like 'N%'
group by firstlady_birthplace

-- 4. 
select presi_lastname,firstlady_firstname from president natural join firstlady
where presi_lastname like 'D%'