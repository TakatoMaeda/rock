const num_bth = document.querySelectorAll('.num_bth'); //querySelectorAll()...文書内にある.num_bth要素のリストを入手
let output_sub = document.getElementById('output_sub');//計算結果を表示する場所を入手（getElementById）
const output_total = document.getElementById('output_total');//計算過程を表示する場所を入手
let total = 0;//計算式を表す変数 初期値
let state = 'start';//最初の状態を定義
    //  1)計算する前の最初の状態（start）　
    //  2)数字を入力している最中（calculation）
    //  3)「＋　÷　－　×　＝」を押した直後（calBtn）
    //  4)「＝」を教えて計算が終わった直後（finish）
    //  変数stateに、star,calculation, calBtn, finishを代入して状態を管理します。  
  let mode = 'integer_mode'; //最初は整数入力モード
  //  変数modeに、整数入力中integer_mode、小数入力中decimal_modeを定義します。

  // 1-9の数字ボタンを押した時、
    const one_nine = document.querySelectorAll('.one_nine');//1-9のボタンを押したら
    one_nine.forEach(index => {  //押されるたびに１つずつ実行していく   
      index.addEventListener('click', () => { //{}をクリックすることで呼び出す
        if(state === 'start') {　//初めの状態を画面に表示しておく
          //最初totalに打った数字を代入する
          total = index.dataset.indexId;         
        }else if(state === 'finish') {//＝を押された場合
          //計算後は、リセット処理後に、totalに打った数字を代入する
          reset();
          total = index.dataset.indexId;  ///初めの状態に戻る
        }else if(state === 'calculation'||state === 'calBtn'){　//何かが入力されている状態かつ何か演算子を入力した状態
          //計算中totalに打った数字を追加して、totalに代入する。
          total += index.dataset.indexId;
        }     
        output_sub.textContent = total;　//計算結果画面に出力
        state = 'calculation'//数字を入力している状態にする。
        changeOutput()//計算結果・計算過程画面の入れ替える
      }) //click   
    })//forEach

  // 0の数字ボタンを押した時
  const zero = document.getElementById('zero');//zeroに対して
  zero.addEventListener('click', () => {
//    - 最初state==='start
//    - 計算終了後state==='finish'
//    - 演算記号入力直後state==='calBtn'の時、
//    前の文字が0の時は0が入力できないようにする。
  if(state==='start'||state==='finish'||state==='calBtn'){//最初、終了後、途中は０が打てない
      if(output_sub.textContent.slice(-1) === '0') { //入力されたものの１つ前が０だったら
        //sliceで切り出されたのは0ではなく'0'
        console.log('前の文字はゼロ');
        return;　　　//元に帰す
      }
    }

    if(state==='start') { //ゼロだったら０を代入して何もしていない状態
      total = zero.dataset.indexId;  
    }else{
      total += zero.dataset.indexId;
    }      
    output_sub.textContent = total;
    changeOutput()//計算結果・計算過程画面の入れ替える
//    state = 'calculation'//数字を入力している状態にする。
  }) //click    

  // 「.」小数点ボタンを押した時
  const point = document.getElementById('point'); //小数点をクリックしたら。。。
  point.addEventListener('click', () => {
    console.log(point.dataset.indexId)
    if(mode === 'decimal_mode'){ //小数点の入力状態
      return; //小数点入力モードではもう一度小数点を押せない
       }      
    //「.4」と入力したら0.4としたい。(1)+(2)で0.4となる
    if(state==='start'||state==='finish') {
      total = 0;//(1)最初と計算終了直後なら、0を入力
    }else if(state==='calBtn'){//そうでない場合、ひとつ前に戻る
      //これを入れないと、0.4+0.4と打つと0.4+00.4となる。
      if(output_sub.textContent.slice(-1)!=='0'){
        total += 0;//(1')演算記号入力直後なら、今までの計算結果に0を入力
      }   
    }
    total += point.dataset.indexId;//(2)「.」を入力

    output_sub.textContent = total;
    state = 'calculation'//数字を入力している状態にする。
    mode = 'decimal_mode'; //小数入力モードに変更
    changeOutput()//計算結果・計算過程画面の入れ替える
  }) //click  

  //「＋　÷　－　×」ボタンを押した時
  const cal = document.querySelectorAll('.cal'); //演算ボタンが押されたら１つずつ実行（入力さrていく）
  cal.forEach(index => {     
    index.addEventListener('click', () => { //クリックする事で入力できるようになる
      if(state === 'start') {//最初の状態に推すと。。。
        return;//最初記号は押せない（戻る）
      }else if(state === 'calculation'){//数字入力モードの時、
        total += index.dataset.indexId;//計算中はtotalに打った記号を追加し、totalに代入する。
      }else if(state === 'finish'){ //=を入力した後に押されると。。。
        //計算後は前の計算結果を計算結果total に代入して計算しなおす。
        total = output_total.textContent;
        total += index.dataset.indexId;
        output_total.textContent = 0
      }else if(state ==='calBtn') {//演算子を入力している時に、
        // 演算記号入力状態state = 'calBtn'の時に、演算記号を押したら、totalの最後の一文字（演算記号）を削除し、新たに押した演算記号を追加する。
//        →totalに、totalの最初から最後から二文字目までを代入する（最後の一文字を削除する）
        total = total.slice(0, -1)
        total += index.dataset.indexId;
      }

      output_sub.textContent = total;
      state = 'calBtn'//演算記号を入力している状態する。
      mode ='integer_mode'//整数モードに戻す
      changeOutput()//計算結果・計算過程画面の入れ替える
    }) //click   
  })//forEach

  //イコールを押した時
  const equal_btn = document.getElementById('equal_btn');//=を押した時、
  equal_btn.addEventListener('click',() =>{
    console.log(eval(total));
    output_total.textContent = digitNum(eval(total));//桁数を揃える関数10桁を表示させる関数digitNum...
    state = 'finish'//計算が終わった状態にする。
    mode ='integer_mode'//整数モードに戻す
    changeOutput()//計算結果・計算過程画面の入れ替える
  });

  //ACボタン（リセットボタン）を押した時の処理
  const clear = document.getElementById('clear')//クリアボタンを押した時
  clear.addEventListener('click', () => {
    reset();
  })

 //リセットを行う関数
  function reset() {//関数でリセットが行われたら全て０にして整数モードに戻して初期状態
    total = 0; 
    output_sub.textContent = 0;
    output_total.textContent = 0;
    mode ='integer_mode'//整数モードに戻す
    state ='start';
    changeOutput()//計算結果・計算過程画面の入れ替える
  }

  //桁数を揃える関数10桁を表示させる関数。１０桁を超えると四捨五入するようにする
  function digitNum(num) {
    return Math.round(num*100000000)/100000000;
  }

  //計算過程結果、計算結果画面の表示の切り替え
  //  「=」を押した後、 計算後state==='finish'の時だけ計算結果画面output_totalにclass="active"を付ける。そのほかの時はその逆にする。
  function changeOutput(){//下記の条件の時、条件変更
    if(state==='finish'){//計算結果画面の時
      output_total.classList.add('active');//計算画面の時は結果画面の方の出力を、クラスを追加することで表示
      output_sub.classList.remove('active'); //計算画面時に過程画面からクラスを除去し、表示しないようにする
    }else{//そうでない場合元のクラスに戻す
      output_sub.classList.add('active');
      output_total.classList.remove('active'); 
    } 
  }
  
  
  
  
  //現　HTML,CSSは大丈夫だが、JavaScriptの理解が少々遅れている