<template>
    <div class="app-container">
        <div>
            <el-select v-model="value" placeholder="切换活动" @change="changeActivity">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <span>最新活动: {{title}}</span>
        </div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" type="index" :index="indexMethod" width="90" />
            <el-table-column align="center" label="项目" prop="item" width="90" />
            <el-table-column align="center" label="姓名" prop="name" width="180" />
            <el-table-column align="center" label="班级" prop="stuClass" width="180" />
            <el-table-column align="center" label="学号" prop="number" width="200" />
            <el-table-column align="center" label="手机号" prop="phone" width="200" />
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleClick(scope.row)">删除</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: null,
                listLoading: true,
                aid: 0,
                title: '',
                options: [],
                value: ''
            }
        },
        created() {
            this.$api.activity.getMaxId()
                .then(res => {
                    console.log(res)
                    this.aid = res.data.id
                    this.title = res.data.title
                    this.fetchData(this.aid)
                    this.getActivity()
                })
        },
        methods: {
            // 获取报名信息
            fetchData(aid) {
                this.listLoading = true
                this.$api.info.getCompetitionInfo(aid)
                    .then(res => {
                        if (res.code === 200) {
                            this.list = res.data
                        } else {
                            this.list = ''
                            this.$message('没有数据诶')
                        }
                        this.listLoading = false
                    })
            },
            // 获取所有活动信息
            getActivity() {
                this.$api.activity.getActivity()
                    .then(res => {
                        console.log(res)
                        if (res.code === 200) {
                            for (var i = 0; i < res.data.length; i++) {
                                // 将名字赋值给标签，id赋值给值
                                var obj = {
                                    label: res.data[i].title,
                                    value: res.data[i].id
                                }
                                this.options.push(obj)
                            }
                        } else {
                            this.$message('还没有活动诶')
                        }
                    })
            },
            // 改变活动时，重新获取报名信息
            changeActivity(e) {
                console.log(e)
                this.fetchData(e)
            },
            indexMethod(index) {
                return index + 1
            }
        }
    }
</script>

<style>
</style>
