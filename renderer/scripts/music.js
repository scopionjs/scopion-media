// TARGET ELEMENTS
let dark_mode_toggle = document.querySelector('.ball-wrapper')
let minimize = document.querySelector('.minimize')
let maximize  = document.querySelector('.maximize')
let close = document.querySelector('.close')
let ball=document.querySelector('.ball')
let right_bar= document.querySelector('#right-bar')
let frame= document.querySelector('#frame')
let left_bar= document.querySelector('#left-bar')
let minimize_child = document.querySelector('.minimize div')
let maximize_child  = document.querySelector('.maximize div')
let close_child = document.querySelector('.close .lines .line1')
let close_child2 = document.querySelector('.close .lines .line2')
let left_bar_children= document.querySelectorAll('#left-bar div a')
let folder_wrapper = document.querySelector('.box1')
let file_wrapper = document.querySelector('.box2')
let box1_text = document.querySelector('.box1-text')
let box2_text = document.querySelector('.box2-text')
let file = document.querySelector('#file')
let folder = document.querySelector('#folder')
let list_wrapper = document.querySelector('.list')
let layer1 =document.querySelector('.layer1')
let layer2 =document.querySelector('.layer2')
let pause =document.querySelector('.pause')
let pause_icon =document.querySelector('.pause img')
let song_title =document.querySelector('.song-name p')
let next =document.querySelector('.next')
let prev =document.querySelector('.back')
let video_progression =document.querySelector('.progress')
let video_progression_wrapper =document.querySelector('.ctr1')
let repeat = document.querySelector('.repeat')
let shuffle = document.querySelector('.shuffle')
let volume_range =document.querySelector('.volume-range')
let stop_btn =document.querySelector('.stop')
let back_ground =document.querySelector('#back-ground')
let msg= document.querySelector('.msg')
let results_found= document.querySelector('.results-found')
//GLOBAL VARIABLE
let isMaximized=false
let isDarkMode= true
let songs_found=[]
let audio
let playing_song
let isPlaying=false
let isPaused=false
let length_played
let should_repeat=false
let should_shuffle=false
let one_song_path 
let isOne=false
let back_grounds=["../../icons/giphy (6).gif","../../icons/giphy (5).gif","../../icons/giphy (4).gif","../../icons/giphy (2).gif","../../icons/giphy.gif","../../icons/giphy (1).gif"]
//PROMINENT FUNCTIONS

//function to stop a song
let stop_song=()=>{

    if(isPlaying){
        //when song is playing
        audio.src=''
    audio.currentTime=0
    isPaused=true
    //swap icons
    pause_icon.src ="../../icons/3567886.png"
    isPlaying=false
    
    }
}
//function to change volume
let change_volume=()=>{
let volume=volume_range.value/100
audio.volume=volume
}
//function to triger when shuffle is clicked
let shuffle_song=()=>{
    if(should_repeat==false){
        if(should_shuffle==true){
            should_shuffle=false
            shuffle.removeAttribute('style')
        }else{
        should_shuffle=true
        shuffle.setAttribute('style','background-color: rgb(65, 144, 186);')
        }
    }
}
// function to toggle repeat
let repeat_song=()=>{

if(should_shuffle==false){
    if(should_repeat==true){
        should_repeat=false
        repeat.removeAttribute('style')
    }else{
    should_repeat=true
    repeat.setAttribute('style','background-color: rgb(65, 144, 186);')
    }
}
}
//function to adjust the length of the song when song progress bar is clicked
let adjust_song=(e)=>{
    
    let clicked_percentage=e.x/window.innerWidth*100
   let a=audio.currentTime*clicked_percentage
   let b=a/length_played
   audio.currentTime=b
 
    
}
////function to fire every second on playing
let time_updated=(e)=>{
    //getting the video length and the one being played
let {duration,currentTime} =e.srcElement
length_played = currentTime / duration * 100
video_progression.setAttribute('style',`width:${length_played}%;`)

}
//function to fire when the song finishes to play
let song_ended=(e)=>{
   if(should_repeat){
//repeat song
let song_to_play = songs_found[playing_song]
song_title.textContent=song_to_play.name
audio.src=song_to_play.path
   }else if(should_shuffle){
// shuffle songs
let random_number = Math.floor(Math.random()*songs_found.length)
playing_song=random_number
        let song_to_play = songs_found[playing_song]
        song_title.textContent=song_to_play.name
        audio.src=song_to_play.path
        
   }else{
    if(playing_song == songs_found.length-1){
        //when its the last song
        playing_song=0
        let song_to_play = songs_found[playing_song]
        song_title.textContent=song_to_play.name
        audio.src=song_to_play.path
    
    }else{
        //when its not the last song a queue
        playing_song++
        let song_to_play = songs_found[playing_song]
        song_title.textContent=song_to_play.name
        audio.src=song_to_play.path
    }
   }
}
//function to play the previoussong
let previous_song=()=>{
if(isOne){
    audio.src=one_song_path
}else{
    if(playing_song==0){
        //when its the first song
        if(isPaused){
            pause_icon.src ="../../icons/icon (3).png"
            isPaused=false
            isPlaying=true
        }
        playing_song=songs_found.length-1
        let song_to_play = songs_found[playing_song]
        song_title.textContent=song_to_play.name
        audio.src=song_to_play.path
    
}else{ 
        //when its not the first song
        if(isPaused){
            pause_icon.src ="../../icons/icon (3).png"
            isPaused=false
            isPlaying=true
        }
        playing_song--
        let song_to_play = songs_found[playing_song]
        song_title.textContent=song_to_play.name
        audio.src=song_to_play.path
       
}
}
}
//function to play the next song
let next_song=()=>{
if(isOne){
    audio.src=one_song_path
}{
    if(playing_song == songs_found.length-1){
        //when its the last song
        if(isPaused){
            pause_icon.src ="../../icons/icon (3).png"
            isPaused=false
            isPlaying=true
        }
        playing_song=0
        let song_to_play = songs_found[playing_song]
        song_title.textContent=song_to_play.name
        audio.src=song_to_play.path
    
    }else{
        //when its not the last song a queue
        if(isPaused){
            pause_icon.src ="../../icons/icon (3).png"
            isPaused=false
            isPlaying=true
        }
        playing_song++
        let song_to_play = songs_found[playing_song]
        song_title.textContent=song_to_play.name
        audio.src=song_to_play.path
    }
}
}
//function to pause a song
let pause_song=(e)=>{
if(isPlaying){
    //when song is playing
audio.pause()
isPaused=true
//swap icons
pause_icon.src ="../../icons/3567886.png"
isPlaying=false
}else if(isPaused){
let time=audio.currentTime
let selected =songs_found[playing_song]

if(isOne){
    audio.src=one_song_path 
}else{
    audio.src=selected.path
}
audio.currentTime=time
audio.play()
isPlaying=true
isPlaying=true

pause_icon.src ="../../icons/icon (3).png"
}
}
// function to play a song
let play_song=(e)=>{
    pause_icon.src ="../../icons/icon (3).png"
    playing_song=e.srcElement.id
    let selected_song= songs_found[e.srcElement.id]
    layer1.setAttribute('style','display:none;')
    layer2.setAttribute('style','display:block;')
    //darkmode toggling
    if (isDarkMode) {
        
    layer2.setAttribute('class','layer2')
    } else {
        
    layer2.setAttribute('class','layer2 layer2_light')
    }
    //creating audio element
    song_title.textContent =selected_song.name
    audio = new Audio(selected_song.path)
    audio.onended=song_ended
    audio.ontimeupdate=time_updated
audio.oncanplay=(e)=>{
    audio.play()
    isPlaying=true
    
}

    }
// REQUEST TO PRELOAD  TO MINIMIZE , MAXIMIZE, UNMIXIMIZE AND CLOSE WINDOW
// minimize
minimize.onclick =()=>{
    window.api.minimize()
}

maximize.onclick =()=>{

   if(isMaximized){
       //unmaximize
    window.api.unMaximize()
    isMaximized=false
   }else{
       // maximize
    window.api.maximize()
    isMaximized=true
   }
}
close.onclick =()=>{
    window.api.close()
}
//DARKMODE TOGGLING
dark_mode_toggle.onclick=()=>{

    if(isDarkMode){
        //from darkmode
ball.setAttribute('style','left:0;background-color:grey;')
right_bar.setAttribute('style',' background-color: rgb(219, 212, 212);')
frame.setAttribute('style',' background-color: rgb(255, 255, 255);')
dark_mode_toggle.setAttribute('style',' border: 2px grey solid;')
left_bar.setAttribute('style','background-color:#eeeeeeee;')
minimize_child.setAttribute('style',' background-color:grey;')
maximize_child.setAttribute('style',' border:2px grey solid;') 
close_child.setAttribute('style',' background-color:grey;')
close_child2.setAttribute('style',' background-color:grey;')
file_wrapper.setAttribute('style',' background: rgb(199, 195, 195) ;box-shadow: 5px 7px 5px 0px rgb(137, 149, 149);')
folder_wrapper.setAttribute('style',' background: rgb(199, 195, 195) ;box-shadow: 5px 7px 5px 0px rgb(137, 149, 149);')
box1_text.setAttribute('style','color:black;')
box2_text.setAttribute('style','color:black;')
left_bar_children.forEach((e)=>{
    e.setAttribute('style','color:black;')
})
isDarkMode=false
window.api.changeColorStatus(isDarkMode)
if(isPlaying==false){
    window.location.reload()
}
    }else{
        // to dark mode
ball.setAttribute('style','right:0;')
right_bar.removeAttribute('style')
frame.removeAttribute('style')
dark_mode_toggle.removeAttribute('style')
left_bar.removeAttribute('style')
minimize_child.removeAttribute('style')
maximize_child.removeAttribute('style')
close_child.removeAttribute('style')
close_child2.removeAttribute('style')
folder_wrapper.removeAttribute('style')
file_wrapper.removeAttribute('style')
box1_text.removeAttribute('style')
box2_text.removeAttribute('style')
left_bar_children.forEach((e)=>{
    e.removeAttribute('style')
})
isDarkMode=true
window.api.changeColorStatus(isDarkMode)
if(isPlaying==false){
    window.location.reload()
}
    }
}
// HOVERING IN LIGHT MODE
minimize.onmouseover =(e)=>{
if(!isDarkMode){
e.target.setAttribute('style',' background-color:#eee;')
}
}
minimize.onmouseleave =(e)=>{
    if(!isDarkMode){
    e.target.removeAttribute('style')
minimize_child.setAttribute('style',' background-color:grey;') 
}
}

maximize.onmouseover =(e)=>{
    if(!isDarkMode){
    e.target.setAttribute('style',' background-color:#eee;')
    maximize_child.setAttribute('style',' border:2px grey solid;')
    }
    }
maximize.onmouseleave =(e)=>{
        if(!isDarkMode){
        e.target.removeAttribute('style')
    }
    }
left_bar_children.onmouseover =(e)=>{
    if(!isDarkMode){
        console.log(e)
    e.target.setAttribute('style',' background-color:#eee;')
    }
    }
    left_bar_children.forEach((e)=>{
        e.onmouseover =(e)=>{
            if(!isDarkMode){
         e.target.setAttribute('style',' background-color:rgb(172, 177, 177);color:white;')
            }
    }
     e.onmouseleave=(e)=>{
        if(!isDarkMode){
            e.target.removeAttribute('style')
            e.target.setAttribute('style','color:black;')
        }
     }
    })

window.onload =async()=>{
  
// change image after every 9 seconds
setInterval(()=>{
let index=Math.floor(Math.random()*back_grounds.length-1)
if(index >=0){
    back_ground.src=back_grounds[index]

}
},9000)
// CHECKING THE BACKGROUND COLOR STATUS WHEN WINDOW LOADS
let res=await window.api.colorStatusCheck()
isDarkMode = res.isDarkMode
  if(isDarkMode){
       // to dark mode
       ball.setAttribute('style','right:0;')
       results_found.removeAttribute('style')
       msg.removeAttribute('style')
       right_bar.removeAttribute('style')
       frame.removeAttribute('style')
       dark_mode_toggle.removeAttribute('style')
       left_bar.removeAttribute('style')
       minimize_child.removeAttribute('style')
       maximize_child.removeAttribute('style')
       close_child.removeAttribute('style')
       close_child2.removeAttribute('style')
       folder_wrapper.removeAttribute('style')
       file_wrapper.removeAttribute('style')
       box1_text.removeAttribute('style')
       box2_text.removeAttribute('style')
       left_bar_children.forEach((e)=>{
           e.removeAttribute('style')
       })
  }else{
            // to light mode
ball.setAttribute('style','left:0;background-color:grey;')
right_bar.setAttribute('style',' background-color: rgb(219, 212, 212);')
frame.setAttribute('style',' background-color: rgb(255, 255, 255);')
dark_mode_toggle.setAttribute('style',' border: 2px grey solid;')
left_bar.setAttribute('style','background-color:#eeeeeeee;')
minimize_child.setAttribute('style',' background-color:grey;')
maximize_child.setAttribute('style',' border:2px grey solid;')
close_child.setAttribute('style',' background-color:grey;')
close_child2.setAttribute('style',' background-color:grey;')
file_wrapper.setAttribute('style',' background: rgb(199, 195, 195) ;box-shadow: 5px 7px 5px 0px rgb(137, 149, 149);')
box1_text.setAttribute('style','color:black;')
results_found.setAttribute('style','color :rgb(60, 54, 54);')
msg.setAttribute('style','color :rgb(60, 54, 54);')
box2_text.setAttribute('style','color:black;')
folder_wrapper.setAttribute('style',' background: rgb(199, 195, 195) ;box-shadow: 5px 7px 5px 0px rgb(137, 149, 149);')
left_bar_children.forEach((e)=>{
    e.setAttribute('style','color:black;')
})
  }
  console.log(await window.api.fetch_stored_songs())
  //FETCHING SONGS FOR STORED PATH
let stored_songs= await window.api.fetch_stored_songs()
console.log( stored_songs)

if(stored_songs.filtered_files.length ==0){
  //when not files are stored
  msg.textContent =" choose a file or folder"
}else{
  //when some files are stored
  stored_songs.filtered_files.forEach((item,index_path)=>{
  item.forEach((data,file_index)=>{
let myPath =`${stored_songs.existing_paths[index_path]}${data}`
let obj ={path:myPath,name:data}
songs_found.push(obj)
let div = document.createElement('div')
let img = document.createElement('img')
let p = document.createElement('p')
div.classList.add('item-wrapper')
div.onclick =play_song
if (isDarkMode==false) {
  div.setAttribute('style','background-color: rgb(179, 193, 193);')
  p.setAttribute('style','color :rgb(60, 54, 54);')
  results_found.setAttribute('style','color :rgb(60, 54, 54);')
    msg.setAttribute('style','color :rgb(60, 54, 54);')
  }
let index =songs_found.length-1
div.id=index
img.id=index
p.id=index
img.src="../../icons/875590.png"
p.innerHTML=data
div.appendChild(img)
div.appendChild(p)
list_wrapper.appendChild(div)
results_found.textContent = `${songs_found.length} songs found`
  })
})
} 
}
// MANIPULATING OPENNED FOLDER
folder.addEventListener('change',async(e)=>{
    if(e.target.files.length !==0){
// when the chosen folder is not empty
msg.textContent=''
// logic to get the path of the folder
 
let first_file_name = e.target.files[0].name
let first_file_path = e.target.files[0].path
let folder_path = first_file_path.split(first_file_name)[0]
// sending path to store it and check if it already exist returning true if exists and vice-versa
let folderExist=await window.api.send_song_folder_path(folder_path)
if(folderExist){
//when the path chosen has already been stored
msg.textContent = 'the songs of that folder are already available , kindly choose any other folder'
}else{
     //when the path chosen is not stored in db....
//filtering songs  only     
let allFiles=Array.from(e.target.files)
let filtered=allFiles.filter((item)=>{
return item.type.includes('audio/') == true
})
if(filtered.length == 0){
    msg.textContent ='there are no video types in the chosen folder or the video formats are not supported'
}else{
    //looping to display a list of songs
filtered.forEach((item)=>{
    songs_found.push(item)
    let div = document.createElement('div')
    let img = document.createElement('img')
    let p = document.createElement('p')
    div.classList.add('item-wrapper')
    if (isDarkMode==false) {
    div.setAttribute('style','background-color: rgb(179, 193, 193);')
    p.setAttribute('style','color :rgb(60, 54, 54);')
    }
    div.onclick =play_song
let index =songs_found.length==0?0:songs_found.length-1
    div.id=index
    img.id=index
    p.id=index
    img.src="../../icons/875590.png"
    p.innerHTML=item.name
    div.appendChild(img)
    div.appendChild(p)
    list_wrapper.appendChild(div)
    results_found.textContent =`${songs_found.length} songs found`
})

}

}
    }else{
        //when the chosen folder is empty
        msg.textContent='the selected folder is empty choose another one'
    }
})
//WHEN PAUSE IS CLICKED
pause.onclick=pause_song
//WHEN NEXT IS CLICKED
next.onclick=next_song
//WHEN YOU CLICK ON BACK ARROW
prev.onclick=previous_song
//adjust song by clicking on the progress bar
video_progression_wrapper.onclick=adjust_song
//WHEN REAPEAT BUTTON IS CLICKED
repeat.onclick=repeat_song
//WHEN SHUFFLE BUTTON IS CLICKED
shuffle.onclick=shuffle_song
//CHANGING VOLUME WHEN SEEKED
volume_range.onchange=change_volume
// WHEN STOP IS CLICKED
document.querySelectorAll('.group2 button.stop').forEach(element => {
    element.onclick=stop_song
});
// SETTING UP SHORTCUTS
window.onkeydown=(e)=>{
if(isPlaying){
    if(e.code=="Space" ){
        pause_song()
     }else if(e.key=="ArrowLeft" ){
 previous_song()
     }else if(e.key=="ArrowRight"){
 next_song()
     }else if(e.key=="r" && isOne==false){
         repeat_song()
             }else if(e.key=="s"){
                 stop_song()
                     }else if(e.key=="x" && isOne==false){
                        shuffle_song()
                            }else if(e.key=="ArrowDown"){
                                volume_range.value--
                                change_volume()
                                    }else if(e.key=="ArrowUp"){
                                        volume_range.value++
                                        change_volume()
                                            }else if(e.key=="b"){
                                                layer1.setAttribute('style','display:flex;')
                                                layer2.setAttribute('style','display:none;')
                                                isPlaying=false
                                                isPaused=false
                                                audio.src=''
                                                if(isOne){
                                                    isOne=false
                                                   // next.removeAttribute('style')
                                                    //prev.removeAttribute('style')
                                                    shuffle.removeAttribute('style')
                                                    repeat.removeAttribute('style')
                                                    pause_icon.src ="../../icons/icon (3).png"
                                                   
                                                }
                                                    }
}else if(isPaused){
    if(e.code=="Space"){
        pause_song()
     }else if(e.key=="ArrowLeft"){
        previous_song()
            }else if(e.key=="ArrowRight"){
                next_song()
                    }else if(e.key=="b"){
                        layer1.setAttribute('style','display:flex;')
                        layer2.setAttribute('style','display:none;')
                        isPlaying=false
                        isPaused=false
                        audio.src=''
                        if(isOne){
                            isOne=false
                            //next.removeAttribute('style')
                            //prev.removeAttribute('style')
                            shuffle.removeAttribute('style')
                            repeat.removeAttribute('style')
                            pause_icon.src ="../../icons/icon (3).png"
                        }
                            }else if(e.key=="ArrowDown"){
                                volume_range.value--
                                change_volume()
                                    }else if(e.key=="ArrowUp"){
                                        volume_range.value++
                                        change_volume()
                                            }
}
}

//
// RECEIVING AND PROCESSING A FILE
file.onchange =(e)=>{
    let selected_file = e.target.files[0]
    if(selected_file.type.includes('audio/') == true){
        layer1.setAttribute('style','display:none;')
        layer2.setAttribute('style','display:block;')
       // next.setAttribute('style','display:none;')
        //prev.setAttribute('style','display:none;')
        shuffle.setAttribute('style','display:none;')
        repeat.setAttribute('style','display:none;')
        isPlaying=true
        isOne=true
        one_song_path=selected_file.path
        isPaused=false
        audio=new Audio()
        audio.src=selected_file.path
        audio.oncanplay=()=>{
            audio.play()
        pause_icon.src ="../../icons/icon (3).png"
        }
        song_title.textContent=selected_file.name
        audio.ontimeupdate=time_updated
    }else{
        msg.textContent='the selected file is not an image type or the format is not supported'
    }
   
    }