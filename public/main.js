new Vue({
  el: '#app',
  data: function(){
    return {
      words: words,
      score: 0,
      miss: 0,
      unsolvedWords: [],
      solvedWords: [],
      randomIndex: 0,
      loc: 0,
      isTrying: false,
      iscurrentWord: "",
      currentCopy: "",
      wordsCopy: [],
      isSmart: false
    }
  },

  computed: {
    currentWordNumber() {
      return this.solvedWords.length + 1
    },
  },

  methods: {
    restart() {
      for(let i = 0; i < this.wordsCopy.length; i++) {
        this.words[i] = {...this.wordsCopy[i]};
      }
      this.solvedWords = [],
      this.isTrying = false,
      this.score = 0,
      this.miss = 0,
      this.unsolvedWords = [],
      this.solvedWords = [],
      this.loc = 0,
      this.iscurrentWord = "",
      this.currentCopy = ""
    },

    showResult() {
      if(this.words.length == this.solvedWords.length) { 
          for(let i = 0; i < this.wordsCopy.length; i++) {
            this.words[i] = {...this.wordsCopy[i]};
          }
        // this.words = this.wordsCopy, ←これは参照渡しに戻ってしまう
        this.solvedWords = [],
        this.isTrying = false,
        this.score = 0,
        this.miss = 0,
        this.unsolvedWords = [],
        this.solvedWords = [],
        this.loc = 0,
        this.iscurrentWord = "",
        this.currentCopy = "",
        setTimeout(() => {
          alert('完走！！')();
        }, 200);
      }else {
        return
      }
    },

    updateTarget() {
      let placeholder = "";
      for (let i = 0; i < this.loc; i++) {
        placeholder += '_';
      }
      this.iscurrentWord.title = placeholder + this.iscurrentWord.title.substring(this.loc);
    },

    currentWord() {
        this.unsolvedWords = this.words.filter((word) => {
            return (!this.solvedWords.includes(word)) // 解答されてないものだけ
        })
        this.randomIndex = Math.floor(Math.random() * this.unsolvedWords.length)
        this.iscurrentWord = this.unsolvedWords[this.randomIndex]
        this.currentCopy = this.iscurrentWord
    },
  },

  created: function() {
    setTimeout(() => {
      for(let i = 0; i < this.words.length; i++) {
        this.wordsCopy[i] = {...this.words[i]};
      }
    }, 500);
    const mytap = window.ontouchstart===null?"touchstart":"click";
    window.addEventListener(mytap, () => {
      if (this.isTrying === true) {
        return;
      }
      this.isTrying = true;
      this.currentWord();
    }),

    window.addEventListener('keyup', e => {
      if (this.isTrying !== true) {
        return;
      }
      if (e.key === this.iscurrentWord.title[this.loc]) {
        this.loc++;
        this.updateTarget();

        if (this.loc === this.iscurrentWord.title.length) {
          this.solvedWords.push(this.currentCopy)
          this.currentWord() //これが一番先頭だとpush前発火でunresolvedが最初のみ連続になる(clickとkeyupで)
          setTimeout(() => {
            this.showResult();
            }, 10);
          this.loc = 0;
        }
        this.score++;
        
      } else {
        this.miss++;
      }
    });
  },
})
