local: cleanup copy-resources
	zat server
  
dev prod: cleanup copy-resources
	zat clean
	zat package
	cp ./tmp/app*.zip ./build/$@.zip
	rm -rf ./tmp
  
cleanup:
	rm -rf ./assets/common
	rm -f ./assets/iframe.html
	rm -f ./assets/logo*
	rm -rf ./tmp
	rm -rf ./build
  
copy-resources:
	mkdir ./assets/common
	mkdir ./build
	cp ../common/html/iframe.html ./assets/iframe.html
	cp ../common/logos/* ./assets  
	cp ../common/config/$(MAKECMDGOALS).js ./assets/common/config.js
	cp ../common/scripts/main.js ./assets/common/main.js
	cp ../common/styles/main.css ./assets/common/main.css