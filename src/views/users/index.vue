<template>
    <div class="app-container">
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" type="index" :index="indexMethod" width="90" />
            <el-table-column align="center" label="姓名" prop="name" width="180" />
            <el-table-column align="center" label="性别" prop="sex" width="90" />
            <el-table-column align="center" label="班级" prop="stuClass" width="180" />
            <el-table-column align="center" label="学号" prop="number" width="200" />
            <el-table-column align="center" label="QQ" prop="qq" width="200" />
            <el-table-column align="center" label="部门" prop="depart" width="200" />
            <el-table-column align="center" label="邮箱" prop="email" width="200" />
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
                listLoading: true
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                this.$api.info.getUsersInfo(0, 100)
                .then(res => {
                    console.log(res.data)
                    this.list = res.data.list
                    this.listLoading = false
                })
            },
            indexMethod(index) {
                return index + 1
            }
        }
    }
</script>
