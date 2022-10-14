require "csv" # CSVファイルを扱うためのライブラリを読み込んでいます
puts "1 → 新規でメモを作成する / 2 → 既存のメモを編集する"

memo_type = gets.to_i # ユーザーの入力値を取得し、数字へ変換しています
input_number = memo_type
# if文を使用して続きを作成していきましょう。
# 「memo_type」の値（1 or 2）によって処理を分岐させていきましょう

if input_number == 1
  puts "拡張子を除いたファイルを入力してください"
  file_name = gets
  puts file_name.chomp
  puts "メモのメモの内容を記入してください"
  puts "入力状態でないときにENTERキーでメモ完了です。"
  memo_content = gets
  puts memo_content.chomp
  
  CSV.open("#{file_name}.csv", 'w') do |csv|
    csv << [memo_content]
  end


elsif input_number == 2
  puts "既存のメモを編集します。編集するファイル名を入力してください"
  file_name = gets
  puts file_name.chomp
  puts "追加するメモを記入してください"
  puts "入力状態でないときにENTERキーでメモ完了です。"
  memo_content = gets
  puts memo_content.chomp
  CSV.open("#{file_name}.csv",'a') do |memo|
    memo << [memo_content]
  end
  
else
  puts "１か２を入力してください"
end