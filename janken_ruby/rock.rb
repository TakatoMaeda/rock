puts "最初はグーじゃんけん・・・・"

def janken
  puts "0:グー , 1:チョキ , 2:パー , その他:やめる"

  player_hand = gets.to_i
  program_hand = rand(0..2)

  jankens = ["グー", "チョキ","パー"]
  puts "あなたの手:#{jankens[player_hand]}, 相手の手:#{jankens[program_hand]}"
  
  if player_hand == program_hand
    puts "あいこで"
    return true
    
  elsif(player_hand == 0 && program_hand == 1)||(player_hand == 1 && program_hand == 2)||(player_hand == 2 && program_hand == 0)
    puts "あなたの勝ちです"
    @janken = "win"
    return false
    
  elsif(player_hand == 0 && program_hand == 2)||(player_hand == 1 && program_hand == 0)||(player_hand == 2 && program_hand == 1)
    puts "あなたの負けです"
    @janken = "lose"
    return false
    
  else
    puts "じゃんけんを終了します"
  end

end

next_game = true

while next_game
  next_game = janken
end

  puts "あっちむいて..."
  puts "1 : 上 , 2 : 下 , 3 : 左 , 4 : 右"
 
  player_finger = gets.to_i
  program_finger = rand(0..4)
  fingers = ["上", "下","左","右"]
  puts "あなたの手:#{fingers[player_finger]}, 相手の手:#{fingers[program_finger]}"
    
  if (@janken == "win")&&(player_finger == program_finger)
    puts "あなたの勝ちです。勝利しました！"
    
  elsif (@janken == "lose")&&(player_finger == program_finger)
    puts "あなたの負けです。どんまいです！"
    
  else
    puts "もう一回初めからしましょう！"
　  janken
  end