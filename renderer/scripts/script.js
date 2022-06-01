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
let list = document.querySelector('.list')
let layer1 =document.querySelector('.layer1')
let layer2 =document.querySelector('.layer2')
let pause =document.querySelector('.pause')
let pause_icon =document.querySelector('.pause img')
let video_title =document.querySelector('.video-name p')
let next =document.querySelector('.next')
let prev =document.querySelector('.back')
let video_progression =document.querySelector('.progress')
let video_progression_wrapper =document.querySelector('.ctr1')
let repeat = document.querySelector('.repeat')
let shuffle = document.querySelector('.shuffle')
let volume_range =document.querySelector('.volume-range')
let stop_btn =document.querySelector('.stop')
let back_ground =document.querySelector('#back-ground')
let video = document.querySelector('.video video')
let msg= document.querySelector('.msg')
let results_found= document.querySelector('.results-found')
//GLOBAL VARIABLE
let isMaximized=false
let videos_found=[]
let isDarkMode= true
let isPlaying =false
let isPaused =false
let playing_video
let successful_indexes=[]
let isOne=false
let should_repeat=false
let should_shuffle =false
//PROMINENT
// function to toggle repeat
let repeat_video=()=>{

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
//function to triger when shuffle is clicked
let shuffle_video=()=>{
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
//function to play the previousvideo
let previous_video=()=>{
    if(isOne){
        video.src=one_video_path
    }else{
        if(playing_video==0){
            //when its the first video
            if(isPaused){
                pause_icon.src ="../../icons/icon (3).png"
                isPaused=false
                isPlaying=true
            }
            playing_video=parseInt(successful_indexes[successful_indexes.length-1])
            let video_to_play = videos_found[playing_video]
            video_title.textContent=video_to_play.name
            video.src=video_to_play.path
        
    }else{
            //when its not the first video
            if(isPaused){
                pause_icon.src ="../../icons/icon (3).png"
                isPaused=false
                isPlaying=true
            }
            let current_index=successful_indexes.map((item,index)=>{
                if(item==playing_video){
                    return index
                }
                 
            })
            let main_index = current_index.filter((item)=>{
                return item !== undefined
            })
            let major_index=parseInt(main_index)
            let next_in_succ =major_index-1
          
           let value_of_next =parseInt(successful_indexes[next_in_succ])
            let next_item=videos_found[value_of_next]
            playing_video=value_of_next
            video_title.textContent=next_item.name
            video.src=next_item.path
           
    }
    }
    }
//function to pause a video
let pause_video=(e)=>{
    if(isPlaying){
        //when video is playing
    video.pause()
    isPaused=true
    //swap icons
    pause_icon.src ="../../icons/3567886.png"
    isPlaying=false
    }else if(isPaused){
    let time=video.currentTime

    let selected =videos_found[playing_video]
    
    if(isOne){
        video.src=one_video_path 
    }else{
        video.src=selected.path
    }
    video.currentTime=time
    video.play()
    isPlaying=true
    isPlaying=true
    
    pause_icon.src ="../../icons/icon (3).png"
    }
    }
//function to stop a video
let stop_video=()=>{

    if(isPlaying){
        //when video is playing
        video.src=''
    video.currentTime=0
    isPaused=true
    //swap icons
    pause_icon.src ="../../icons/3567886.png"
    isPlaying=false
    
    }
}
//function to adjust the length of the video when video progress bar is clicked
let adjust_video=(e)=>{
    
    let clicked_percentage=e.x/window.innerWidth*100
   if(clicked_percentage <= 100){
    let a=video.currentTime*clicked_percentage
    let b=a/length_played
    video.currentTime=b
  
   }
    
}
//function to change volume
let change_volume=()=>{
    let volume=volume_range.value/100
   video.volume=volume
    }
//function to fire every second on playing
let video_ended=(e)=>{
    if(should_repeat){
        //repeat video
        let video_to_play = videos_found[playing_video]
        video_title.textContent=video_to_play.name
        video.src=video_to_play.path
           }else if(should_shuffle){
        // shuffle videos
        let random_number = Math.floor(Math.random()*successful_indexes.length)
       let value_of_next =parseInt(successful_indexes[random_number])
        let next_item=videos_found[value_of_next]
        playing_video=value_of_next
        video_title.textContent=next_item.name
        video.src=next_item.path
        
           }else{
            if(playing_video == videos_found.length-1){
                //when its the last video
                playing_video= successful_indexes[0]
                let video_to_play = videos_found[playing_video]
                video_title.textContent=video_to_play.name
                video.src=video_to_play.path
            
            
            }else{
                //when its not the last video a queue
                let current_index=successful_indexes.map((item,index)=>{
                    if(item==playing_video){
                        return index
                    }
                     
                })
                let main_index = current_index.filter((item)=>{
                    return item !== undefined
                })
                let major_index=parseInt(main_index)
                let next_in_succ =major_index+1
              
               let value_of_next =parseInt(successful_indexes[next_in_succ])
                let next_item=videos_found[value_of_next]
                playing_video=value_of_next
                video_title.textContent=next_item.name
                video.src=next_item.path
                
            }
           }
}
//function to fire every second on playing
let time_updated=(e)=>{
 //getting the video length and the one being played
 let {duration,currentTime} =e.srcElement
 length_played = currentTime / duration * 100
 video_progression.setAttribute('style',`width:${length_played}%;`)
 

}
//function to play the next video
let next_video=()=>{
    if(isOne){
        video.src=one_video_path
    }{
        if(playing_video == videos_found.length-1){
            //when its the last video
            if(isPaused){
                pause_icon.src ="../../icons/icon (3).png"
                isPaused=false
                isPlaying=true
            }
            playing_video=parseInt( successful_indexes[0])
            let video_to_play = videos_found[playing_video]
            video_title.textContent=video_to_play.name
            video.src=video_to_play.path
        
        }else{
            //when its not the last video a queue
            if(isPaused){
                pause_icon.src ="../../icons/icon (3).png"
                isPaused=false
                isPlaying=true
            }
            let current_index=successful_indexes.map((item,index)=>{
                if(item==playing_video){
                    return index
                }
                 
            })
            let main_index = current_index.filter((item)=>{
                return item !== undefined
            })
            let major_index=parseInt(main_index)
            let next_in_succ =major_index+1
          
           let value_of_next =parseInt(successful_indexes[next_in_succ])
            let next_item=videos_found[value_of_next]
            playing_video=value_of_next
            video_title.textContent=next_item.name
            video.src=next_item.path
            
        }
    }
    }
//function to play a video
let play_video=(e)=>{
   if(pause!==null || pause !== undefined ){
    pause_icon.src ="../../icons/icon (3).png"
   }
    playing_video=e.srcElement.id
    let selected_video= videos_found[e.srcElement.id]
    layer1.setAttribute('style','display:none;')
    layer2.setAttribute('style','display:block;')
    //darkmode toggling
    if (isDarkMode) {
        video.setAttribute('class','the_video')
        } else {
            
        video.setAttribute('class','the_video the_video_light')
        }
video_title.textContent = selected_video.name
video.src=selected_video.path
video.onended=video_ended
video.ontimeupdate=time_updated
video.oncanplay=(e)=>{
video.play()
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
box1_text.setAttribute('style','color:gray;')
box2_text.setAttribute('style','color:gray;')
left_bar_children.forEach((e)=>{
    e.setAttribute('style','color:gray;')
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
// CHECKING THE BACKGROUND COLOR STATUS WHEN WINDOW LOADS
let res=await window.api.colorStatusCheck()
isDarkMode = res.isDarkMode
  if(isDarkMode){
       // to dark mode
       ball.setAttribute('style','right:0;')
       right_bar.removeAttribute('style')
       results_found.removeAttribute('style')
       msg.removeAttribute('style')
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
box2_text.setAttribute('style','color:black;')
results_found.setAttribute('style','color :rgb(60, 54, 54);')
msg.setAttribute('style','color :rgb(60, 54, 54);')
folder_wrapper.setAttribute('style',' background: rgb(199, 195, 195) ;box-shadow: 5px 7px 5px 0px rgb(137, 149, 149);')
left_bar_children.forEach((e)=>{
    e.setAttribute('style','color:black;')
})
  }

   //FETCHING videos FOR STORED PATH
let stored_videos= await window.api.fetch_stored_videos()

if(stored_videos.filtered_files.length ==0){
  //when no files are stored
msg.textContent =" choose a file or folder"
}else{
  //when some files are stored
  stored_videos.filtered_files.forEach((item,index_path)=>{
  item.forEach((data,file_index)=>{
let myPath =`${stored_videos.existing_paths[index_path]}${data}`
let obj ={path:myPath,name:data}
videos_found.push(obj)
let div = document.createElement('div')
let vid = document.createElement('video')
let p = document.createElement('p')
div.classList.add('video-wrapper')
if (isDarkMode==false) {
    div.setAttribute('style','background-color: rgb(179, 193, 193);')
    p.setAttribute('style','color :rgb(60, 54, 54);')
    results_found.setAttribute('style','color :rgb(60, 54, 54);')
    msg.setAttribute('style','color :rgb(60, 54, 54);')
  }
  div.onclick =play_video
let index =videos_found.length==0?0:videos_found.length-1
div.id=index
vid.id=index
p.id=index
vid.src=myPath
vid.oncanplay=()=>{
    p.innerHTML=data
div.appendChild(vid)
div.appendChild(p)
list.appendChild(div)
successful_indexes.push(div.id)
results_found.textContent = `${successful_indexes.length} videos found`
}
  })
})
} 

}
// MANIPULATING OPENNED FOLDER
document.querySelector('#folder').addEventListener('change',async(e)=>{
    if(e.target.files.length !==0){
// when the chosen folder is not empty
msg.textContent=''
// logic to get the path of the folder

let first_file_name = e.target.files[0].name
let first_file_path = e.target.files[0].path
let folder_path = first_file_path.split(first_file_name)[0]
// sending path to store it and check if it already exist returning true if exists and vice-versa

let folderExist=await window.api.send_video_folder_path(folder_path)
if(folderExist){
//when the path chosen has already been 
msg.textContent = 'the videos of that folder are already available , kindly choose any other folder'
}else{
     //when the path chosen is not stored in db....
//filtering photos only     
let allFiles=Array.from(e.target.files)
let filtered=allFiles.filter((item)=>{
return item.type.includes('video/mp4') == true || item.type.includes('video/webm') == true
})
if(filtered.length == 0){
    msg.textContent ='there are no video types in the chosen folder or the video formats are not supported'
}else{
    //looping to display a list of images
filtered.forEach((item)=>{
    videos_found.push(item)
    let div = document.createElement('div')
    let vid = document.createElement('video')
    let p = document.createElement('p')
    div.classList.add('video-wrapper')
    if (isDarkMode==false) {
        div.setAttribute('style','background-color: rgb(179, 193, 193);')
          p.setAttribute('style','color :rgb(60, 54, 54);')

    }
    div.onclick =play_video
let index =videos_found.length==0?0:videos_found.length-1
    div.id=index
    vid.id=index
    p.id=index
    vid.src=item.path
    p.innerHTML=item.name
    vid.oncanplay=()=>{
        div.appendChild(vid)
        div.appendChild(p)
        list.appendChild(div)
        successful_indexes.push(div.id)
        results_found.textContent =`${successful_indexes.length} videos found`
    }
  
})
}


}
    }else{
        //when the chosen folder is empty
        msg.textContent='the selected folder is empty choose another one'
    }
})
//WHEN NEXT IS CLICKED
next.onclick=next_video
//CHANGING VOLUME WHEN SEEKED
volume_range.onchange=change_volume
//adjust video by clicking on the progress bar
video_progression_wrapper.onclick=adjust_video
// WHEN STOP IS CLICKED
document.querySelectorAll('.group2 button.stop').forEach(element => {
    element.onclick=stop_video
});
//WHEN PAUSE IS CLICKED
pause.onclick=pause_video
//WHEN YOU CLICK ON BACK ARROW
prev.onclick=previous_video
//WHEN SHUFFLE BUTTON IS CLICKED
shuffle.onclick=shuffle_video
//WHEN REAPEAT BUTTON IS CLICKED
repeat.onclick=repeat_video
// SETTING UP SHORTCUTS
window.onkeydown=(e)=>{
    if(isPlaying){
        if(e.code=="Space" ){
            pause_video()
         }else if(e.key=="ArrowLeft" ){
     previous_video()
         }else if(e.key=="ArrowRight"){
     next_video()
         }else if(e.key=="r" && isOne==false){
             repeat_video()
                 }else if(e.key=="s"){
                     stop_video()
                         }else if(e.key=="x" && isOne==false){
                            shuffle_video()
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
                                                    video.src=''
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
            pause_video()
         }else if(e.key=="ArrowLeft"){
            previous_video()
                }else if(e.key=="ArrowRight"){
                    next_video()
                        }else if(e.key=="b"){
                            layer1.setAttribute('style','display:flex;')
                            layer2.setAttribute('style','display:none;')
                            isPlaying=false
                            isPaused=false
                            video.src=''
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
    // RECEIVING AND PROCESSING A FILE
file.onchange =(e)=>{
    let selected_file = e.target.files[0]
    if(selected_file.type.includes('video/mp4') == true ||selected_file.type.includes('video/webm') == true  ){
        layer1.setAttribute('style','display:none;')
    layer2.setAttribute('style','display:block;')
   // next.setAttribute('style','display:none;')
    //prev.setAttribute('style','display:none;')
    shuffle.setAttribute('style','display:none;')
    repeat.setAttribute('style','display:none;')
    isPlaying=true
    isOne=true
    one_video_path=selected_file.path
    isPaused=false
    //video=new video()
    video.src=selected_file.path
    video.oncanplay=()=>{
        video.play()
    pause_icon.src ="../../icons/icon (3).png"
    }
    video_title.textContent=selected_file.name
    video.ontimeupdate=time_updated
    msg.textContent=``
    }else{
        msg.textContent='the selected file is not a video type or the format is not supported'
    }
    }