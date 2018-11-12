function seriesTag (tag) {

  if(typeof tag === "string") {
    return [{text: tag}]
  } else {

    if(!tag) {
      return []
    }

    let temp = []
    for(let i = 0; i < tag.length; i++){
      temp.push({text: tag[i]})
      if(i == (tag.length - 1)){
        return temp
      }
    }
  }
}

module.exports =  seriesTag