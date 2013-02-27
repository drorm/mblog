foreach ii (amelia cerulean cyborg journal readable simplex spacelab slate spruce superhero united) 
echo $ii
wget -O $ii.css http://bootswatch.com/$ii/bootstrap.min.css
end
