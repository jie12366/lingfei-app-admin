<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="活动名称">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="活动地点">
                <el-select v-model="form.zone" placeholder="选择活动地点">
                    <el-option label="一栋球场" value="一栋球场" />
                    <el-option label="九栋球场" value="九栋球场" />
                    <el-option label="李宁球馆" value="李宁球馆" />
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-col :span="11">
                    <el-date-picker v-model="form.date" type="date" placeholder="选择一个时间" style="width: 100%;" />
                </el-col>
            </el-form-item>
            <el-form-item label="活动海报">
                <img v-show="showImg" style="width: 145px;height: 145px;float: left;border-radius: 5px;margin-right: 10px;" :src="form.picture" />
                <el-upload
                action="#"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :http-request="uploadImg">
                    <i class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="活动内容">
                <tinymce-editor :api_key="api_key" v-model="form.content" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">发布</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    import { parseTime } from '../../utils/index.js'
    import Editor from '@tinymce/tinymce-vue'
    export default {
        data() {
            return {
                form: {
                    title: '',
                    zone: '',
                    date: '',
                    content: '',
                    picture: ''
                },
                dialogImageUrl: '',
                dialogVisible: false,
                aid: Number.parseInt(this.$route.query.aid),
                showImg: false,
                api_key: 'f0jbu1r8vjg2aui3vsrjuv33h36cs54kxl6t3sexxy7dt8gj'
            }
        },
        mounted() {
          if (this.aid > 0) {
              this.showImg = true
              this.getData()
          }
        },
        components: {
          'tinymce-editor': Editor
        },
        methods: {
            getData() {
              this.$api.activity.getActivityById(this.aid)
              .then(res => {
                  this.form = res.data
              })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList)
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url
                this.dialogVisible = true
            },
            // 重写上传图片
            uploadImg(f) {
                const formdata = new FormData()
                formdata.append('smfile', f.file)
                axios({
                    url: 'https://sm.ms/api/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(res => {
                    // 图片上传成功后，隐藏原图片
                    this.showImg = false
                    this.form.picture = res.data.data.url
                })
            },
            onSubmit() {
                console.log(this.form)
                this.form.date = parseTime(this.form.date, '{y}-{m}-{d}')
                // 更新活动
                if (this.aid > 0) {
                    this.form.aid = this.aid
                    this.$api.activity.updateActivity(this.form)
                    .then(res => {
                        if (res.code === 200) {
                            this.$message({
                                message: '更新成功',
                                type: 'success'
                            })
                            this.$router.push('/info/activity')
                        } else if (res.code === 30002) {
                            this.$message({
                                message: '更新失败',
                                type: 'warning'
                            })
                        }
                    })
                } else {
                    // 发布活动
                    this.$api.activity.publishActivity(this.form)
                    .then(res => {
                        if (res.code === 200) {
                            this.$message({
                                message: '发布成功',
                                type: 'success'
                            })
                            this.$router.push('/info/activity')
                        } else if (res.code === 30001) {
                            this.$message({
                                message: '发布失败',
                                type: 'warning'
                            })
                        }
                    })
                }
            },
            onCancel() {
                this.$message({
                    message: 'cancel!',
                    type: 'warning'
                })
            }
        }
    }
</script>

<style scoped>
    .line {
        text-align: center;
    }
</style>
