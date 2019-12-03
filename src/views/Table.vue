<template lang="pug">
	.recordList
		h1.recordList__title Records
		.recordList__wrap
			table.recordList__table
				thead
					tr
						th.sort(:class="[activeSort =='id'? 'activeSort' : '']" @click='sortById') 
							span(:class="[isSortById ? 'highest' : 'lowest']") id
						th 
							span title
						th
							span description
						th.sort(:class="[activeSort =='date'? 'activeSort' : '']" @click='sortByDate')
							span(:class="[isSortByDate ? 'highest' : 'lowest']") date
						th
						th
				tbody
					tr(v-for='record in displayedRecords') 
						td {{record.id}}
						td {{record.title}}
						td {{record.description}}
						td {{getRenderDate(record.date)}}
						td
							router-link.btn(:to="'/edit/'+ record.id") edit
						td
							p.btn(@click='deleteRecords(record)') delete
			.recordList__addBtnWrap
				router-link.recordList__addBtn(to='/add/') Add
			.paggination
				.paggination__item(@click='changePage(item)' v-for='item in paggination' :class="[currentPage ==item ? 'active' : '']") {{item}}
</template>

<script>

export default {
	data() {
		return {
			isSortById: false,
			isSortByDate: false,
			activeSort: 'id',
			displayedRecords: [],
			displayedItemsCount: 2,
			currentPage: 2,
			totalPage: '',
			records: '',
			paggination: ''
		}
	},
	created() {
		this.$store.dispatch('LOAD_RECORDS').then(res =>{
			this.records = res
			if (Math.ceil(res.length / this.displayedItemsCount) === 1){
				this.totalPage = ''
			}
			else{
				this.totalPage = Math.ceil(res.length / this.displayedItemsCount)
			}
			this.paggination = this.getPaginationArray(this.currentPage, this.totalPage)
			this.getDysplayedRecords()
		})
	},
	methods: {
		getDysplayedRecords(){
			let maxIndex = this.currentPage * this.displayedItemsCount
			let minIndex = maxIndex - this.displayedItemsCount + 1
			this.displayedRecords = []
			this.records.forEach((el, i) => {
				if(i >= minIndex-1 && i < maxIndex){
					this.displayedRecords.push(el)
				}
			})
		},
		changePage(index){
			this.currentPage = index
			this.getDysplayedRecords()
		},
		getPaginationArray(c, m){
		let current = c,
			last = m,
			delta = 2,
			left = current - delta,
			right = current + delta + 1,
			range = [],
			rangeWithDots = [],
			l;

			for (let i = 1; i <= last; i++) {
				if (i == 1 || i == last || i >= left && i < right) {
					range.push(i);
				}
			}

			for (let i of range) {
				if (l) {
					if (i - l === 2) {
						rangeWithDots.push(l + 1);
					} else if (i - l !== 1) {
						rangeWithDots.push('...');
					}
				}
				rangeWithDots.push(i);
				l = i;
			}
			return rangeWithDots;
		},
		sortById(){
			this.isSortByDate = false
			this.activeSort = 'id'
			if(!this.isSortById){
				this.displayedRecords.sort((a, b) => a.id < b.id ? 1 : -1);
				this.isSortById = true
			}else{
				this.displayedRecords.sort((a, b) => a.id > b.id ? 1 : -1);
				this.isSortById = false
			}
		},
		sortByDate(){
			this.isSortById = false
			this.activeSort = 'date'
			if(!this.isSortByDate){
				this.displayedRecords.sort( ( a, b) => {
					this.isSortByDate = true
					return new Date(b.date.seconds*1000) - new Date(a.date.seconds*1000) 
				})
			}else{
				this.displayedRecords.sort( ( a, b) => {
					this.isSortByDate = false
					return new Date(a.date.seconds*1000) - new Date(b.date.seconds*1000)             
				})
			}
			return this.displayedRecords
		},
		getRenderDate(timestamp){
			let date = new Date(timestamp.seconds*1000)
			Date.prototype.yyyymmdd = function() {
					let mm = this.getMonth() + 1 // getMonth() is zero-based
					let dd = this.getDate()
					return [
						(dd > 9 ? '' : '0') + dd,
						(mm > 9 ? '' : '0') + mm,
						this.getFullYear(),
					].join('.')
				}
				let formateDate = new Date(date)
				formateDate = formateDate.yyyymmdd()
				return formateDate
		},
		deleteRecords(record){
			this.$store.dispatch('DELETE_RECORDS', record)
		}
	},
}
</script>

<style lang="scss" scoped>
	.recordList{
		width: 1000px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.recordList__title{
		margin: 20px 0;
		width: 100%;
	}

	.recordList__wrap{
		border-radius: 10px;
		overflow: hidden;
	}

	.recordList__table{
		width: 100%;
		border-spacing: 0;

		th{
			font-size: 18px;
			color: #fff;
			line-height: 1.4;
			background-color: #6c7ae0;
			position: relative;

			&.activeSort{

				span{
					position: relative;

					&:before{
						content: '';
						position: absolute;
						width: 0;
						height: 0;
						top: -9px;
						right: 0;
						border-left: 3px solid transparent;
						border-right: 3px solid transparent;
					}

					&.highest{

						&:before{
							border-top: 6px solid #fff;
						}
					}

					&.lowest{

						&:before{
							border-bottom: 6px solid #fff;
						}
					}
				}
			}

			
		}

		tbody{

			tr{
				&:nth-of-type(odd){    
					background-color: #f8f6ff;
				}
			}
		}

		td, th{
			padding: 18px;

			&.sort{
				cursor: pointer;
			}
		}
		
	}

	.recordList__addBtnWrap{
		display: flex;
		width: 100%;
		justify-content: flex-end;
		margin-top: 20px;
	}

	.recordList__addBtn {
		text-decoration: none;
		padding: 10px;
		font-weight: bold;
		text-transform: uppercase;
		color: #fff;
		font-size: 16px;
		background: #6c7ae0;
		border-radius: 10px;
		display: inline-block;
	}

	.paggination{
		display: flex;
		justify-content: flex-end;
		margin: 20px 0;
	}

	.paggination__item{
		width: 30px;
		height: 30px;
		cursor: pointer;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		background: #6c7ae0;
		color: #fff;
		font-size: 16px;
		font-weight: bold;

		&.active{
			background: #6ca0e0;
		}
	}
</style>