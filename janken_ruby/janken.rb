puts "じゃんけんを始めます"
puts "じゃんけん..."
puts "1:グー , 2:チョキ , 3:パー , その他:やめる"

cp_hand = {:グー=>1,:チョキ=>2,:パー=>3}




hand_sign = gets.to_i
cp_hand = rand(1..3)
puts "自分#{hand_sign},相手:#{cp_hand}"

case_pattern = ""
 
if(hand_sign == cp_hand)
  case_pattern = "パターンA"
  
elsif(hand_sign == 1 && cp_hand == 2)
  case_pattern = "パターンB"
elsif(hand_sign == 2 && cp_hand == 3)
  case_pattern = "パターンB"
elsif(hand_sign == 3 && cp_hand == 1)
  case_pattern = "パターンB"
  
elsif(hand_sign == 1 && cp_hand == 3)
  case_pattern = "パターンC"
elsif(hand_sign == 2 && cp_hand == 1)
  case_pattern = "パターンC"
elsif(hand_sign == 3 && cp_hand == 2)
  case_pattern = "パターンC"

else
  case_pattern = "パターンD"

end


 case case_pattern
  when "パターンA"
   puts "あいこです。ジャンケンを終了します。"
   
  when "パターンB"
   puts "あなたの勝ちです。あっちむいて..."
   puts "1 : 上 , 2 : 下 , 3 : 左 , 4 : 右"
    cp_finger = {上:1,下:2,左:3,右:4}
    finger_sign = gets.to_i
    cp_finger = rand(1..4)
　　puts "自分:#{finger_sign},相手:#{cp_finger}"
　　  finger_pattern = ""
　　  if(finger_sign == cp_finger)
　　   finger_pattern = "B-1"
　　  else
　　   finger_pattern = "B-2"
　　  end
　　  
　　    case finger_pattern
　　     when "B-1"
　　       puts "完全勝利です!おめでとうございます!"
　　      else
　　      puts "惜しかったですね。もう１回初めからしましょう!"
　　    end

　 
   when "パターンC"
   puts "あなたの負けです。あっちむいて..."
   puts "1 : 上 , 2 : 下 , 3 : 左 , 4 : 右"
    cp_finger = {上:1,下:2,左:3,右:4}
    finger_sign = gets.to_i
    cp_finger = rand(1..4)
    puts "自分:#{finger_sign},相手:#{cp_finger}"
　　 finger_pattern = ""
　　 if(finger_pattern == cp_finger)
　　  finger_pattern = "C-1"
　　 else
　　  finger_pattern = "C-2"
　　    case finger_pattern
　　     when "C-1"
　　      puts "完全敗北です。ジャンケンを終了します"
　　     when "C-2"
　　      puts "危なかったですね。もう１回初めからしましょう!"
         end
　　 
    when "パターンD"
    puts "ジャンケンを終了します"
    end