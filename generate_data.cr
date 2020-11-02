require "json"
images = Dir.open("./public/assets/img/")
data = [] of Hash(String, String | Int32 | Bool | Nil)
i = 0
images.each_child do |x|
  break unless File.exists?("./public/assets/img/#{x}")
  temp_hash = Hash(String, String | Int32 | Bool | Nil).new
  temp_hash["id"] = i
  temp_hash["votes"] = nil
  temp_hash["name"] = "stickerName"
  temp_hash["img"] = "#{i}.#{x.split(".")[-1]}"
  temp_hash["limited"] = false
  temp_hash["desc"] = "stickerDesc"
  temp_hash["amount"] = 1
  temp_hash["franchise"] = "programming"
  File.rename("./public/assets/img/#{x}", "./public/assets/img/#{i}.#{x.split(".")[-1]}")
  data << temp_hash
  p "[#{x}]: Done"
  i = i + 1
end

File.write("./src/assets/data.json", data.to_pretty_json)
