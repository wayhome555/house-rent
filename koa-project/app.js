const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const mysql = require('mysql2/promise'); 
const multer = require('@koa/multer');
const path = require('path');
const serve = require('koa-static');
require('dotenv').config();

console.log(process.env.DB_USER)

const app = new Koa();
const router = new Router();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,        
  password: process.env.DB_PASS, 
  database: process.env.DB_DATABASE
};

app.use(cors({
  origin: 'http://localhost:5173',
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser());
const pool = mysql.createPool(dbConfig);
// 登录
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      ctx.status = 401;
      ctx.body = { success: false, message: '用户不存在' };
      return;
    }

    const user = rows[0];

    if (user.password !== password) {
      ctx.status = 401;
      ctx.body = { success: false, message: '密码错误' };
      return;
    }

    ctx.body = {
      success: true,
      data: user.username
    };
  } catch (err) {
    console.error('数据库错误:', err);
    ctx.status = 500;
    ctx.body = { success: false, message: '服务器内部错误' };
  } 
});

// deleteUer
router.post('/deleteUser',async(ctx) => {
    const { username } = ctx.request.body;
    try{
        const [result] = await pool.execute(
            'DELETE FROM users WHERE username = ?',
            [username]
        );

        if (result.affectedRows === 0) {
            ctx.status = 404;
            ctx.body = { success: false, message: '用户不存在或密码错误' };
            return;
        }

        ctx.body = { success: true, message: '用户删除成功' };
    } catch(err) {
        console.error('数据库错误:', err);
        ctx.status = 500;
        ctx.body = { success: false, message: '服务器内部错误' };
    }
})

// deleteHouse
router.post('/deleteHouse',async(ctx) => {
    const { id } = ctx.request.body;
    try{
        const [result] = await pool.execute(
            'DELETE FROM house WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            ctx.status = 404;
            ctx.body = { success: false, message: '房源不存在' };
            return;
        }

        ctx.body = { success: true, message: '房源删除成功' };
    } catch(err) {
        console.error('数据库错误:', err);
        ctx.status = 500;
        ctx.body = { success: false, message: '服务器内部错误' };
    }
})

// editHouse
router.post('/editHouse',async(ctx) => {
    const {id, title, address, area, floor, orientation, phone, rent} = ctx.request.body;
    try{
        const [result] = await pool.execute(
            'UPDATE house SET title = ?, address = ?, area = ?, floor = ?, orientation = ?, phone = ?, rent = ? WHERE id = ?',
            [title, address, area, floor, orientation, phone, rent,id]
        )

        if(result.affectedRows === 0){
            ctx.status = 404;
            ctx.body = { success: false, message: '房源不存在' };
            return;
        }

        ctx.body = { success: true, message: '编辑成功' };
    } catch(err) {
        console.error('数据库错误:', err);
        ctx.status = 500;
        ctx.body = { success: false, message: '服务器内部错误' };
    }
})

// editUser
router.post('/editUser',async(ctx) => {
    const {username,password} = ctx.request.body;
    try{
        const [result] = await pool.execute(
            'UPDATE users SET password = ? WHERE username = ?',
            [password,username]
        )

        if(result.affectedRows === 0){
            ctx.status = 404;
            ctx.body = { success: false, message: '用户不存在' };
            return;
        }

        ctx.body = { success: true, message: '编辑成功' };
    } catch(err) {
        console.error('数据库错误:', err);
        ctx.status = 500;
        ctx.body = { success: false, message: '服务器内部错误' };
    }
})

// register
router.post('/register',async(ctx) => {
    const {username,password} = ctx.request.body;
    try{
        const [result] = await pool.execute(
            'INSERT INTO users (username, password) VALUES (?,?)',
            [username,password]
        )

        if(result.affectedRows === 0){
            ctx.status = 404;
            ctx.body = { success: false, message: '添加失败' };
            return;
        }

        ctx.body = { success: true, message: '添加成功' };
    } catch(err) {
        console.error('数据库错误:', err);
        ctx.status = 500;
        ctx.body = { success: false, message: '服务器内部错误' };
    }
})

//add
router.post('/add',async(ctx) => {
  const {image,title,address,area,floor,orientation,phone,rent,owner} = ctx.request.body;
    try{
        const [result] = await pool.execute(
            'INSERT INTO house (image, title, address, area, floor, orientation, phone, rent,owner) VALUES (?,?,?,?,?,?,?,?,?)',
            [image,title,address,area,floor,orientation,phone,rent,owner]
        )

        if(result.affectedRows === 0){
            ctx.status = 404;
            ctx.body = { success: false, message: '添加失败' };
            return;
        }

        ctx.body = { success: true, message: '添加成功' };
    } catch(err) {
        console.error('数据库错误:', err);
        ctx.status = 500;
        ctx.body = { success: false, message: '服务器内部错误' };
    }
})

//addMessage
router.post('/addMessage',async(ctx) => {
    const {nickname,content} = ctx.request.body;
    try{
        const [result] = await pool.execute(
            'INSERT INTO messages (nickname, content) VALUES (?,?)',
            [nickname,content]
        )

        if(result.affectedRows === 0){
            ctx.status = 404;
            ctx.body = { success: false, message: '添加失败' };
            return;
        }

        ctx.body = { success: true, message: '添加成功' };
    } catch(err) {
        console.error('数据库错误:', err);
        ctx.status = 500;
        ctx.body = { success: false, message: '服务器内部错误' };
    }
})

// deleteMessage
router.post('/deleteMessage',async(ctx) => {
    const { id } = ctx.request.body;
    try{
        const [result] = await pool.execute(
            'DELETE FROM messages WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            ctx.status = 404;
            ctx.body = { success: false, message: '留言不存在' };
            return;
        }

        ctx.body = { success: true, message: '留言删除成功' };
    } catch(err) {
        console.error('数据库错误:', err);
        ctx.status = 500;
        ctx.body = { success: false, message: '服务器内部错误' };
    }
})

// info
router.get('/info', async (ctx) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users',
    );
    ctx.body = {
      success: true,
      data: rows
    };
  } catch (err) {
    console.error('数据库错误:', err);
    ctx.status = 500;
    ctx.body = { success: false, message: '服务器内部错误' };
  }
});

// house
router.get('/house',async(ctx)=>{
  try{
    const [rows] = await pool.execute(
      'SELECT * FROM house',
    );
    ctx.body = {
      success: true,
      data: rows
    };
  } catch(err){
    console.error('数据库错误:', err);
    ctx.status = 500;
    ctx.body = { success: false, message: '服务器内部错误' };
  }
})

// message
router.get('/message',async(ctx)=>{
  try{
    const [rows] = await pool.execute(
      'SELECT * FROM messages',
    );
    ctx.body = {
      success: true,
      data: rows
    };
  } catch(err){
    console.error('数据库错误:', err);
    ctx.status = 500;
    ctx.body = { success: false, message: '服务器内部错误' };
  }
})

// totalUser
router.get('/totalUser',async(ctx)=>{
  try{
    const [rows] = await pool.execute(
      'SELECT COUNT(*) FROM users',
    );
    ctx.body = {
      success: true,
      data: rows
    };
  } catch(err){
    console.error('数据库错误:', err);
    ctx.status = 500;
    ctx.body = { success: false, message: '服务器内部错误' };
  }
})

// totalHouse
router.get('/totalHouse',async(ctx)=>{
  try{
    const [rows] = await pool.execute(
      'SELECT COUNT(*) FROM house',
    );
    ctx.body = {
      success: true,
      data: rows
    };
  } catch(err){
    console.error('数据库错误:', err);
    ctx.status = 500;
    ctx.body = { success: false, message: '服务器内部错误' };
  }
})

// totalMessage
router.get('/totalMessage',async(ctx)=>{
  try{
    const [rows] = await pool.execute(
      'SELECT COUNT(*) FROM messages',
    );
    ctx.body = {
      success: true,
      data: rows
    };
  } catch(err){
    console.error('数据库错误:', err);
    ctx.status = 500;
    ctx.body = { success: false, message: '服务器内部错误' };
  }
})

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { success: false, message: err.message || '上传失败' };
  }
});

// 配置存储引擎（指定文件保存路径和文件名）
const storage = multer.diskStorage({
  // 保存路径：需提前在项目根目录创建 uploads 文件夹
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // __dirname 是当前文件所在目录
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); 
    const filename = Date.now() + '-' + Math.random().toString(36).substring(2, 8) + ext;
    cb(null, filename);
  }
});

// 配置文件过滤（限制类型、大小等）
const fileFilter = (req, file, cb) => {
  // 允许的图片类型
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    // 接受文件
    cb(null, true);
  } else {
    // 拒绝文件（返回错误信息）
    cb(new Error('只允许上传 jpg、jpeg、png、gif 格式的图片'), false);
  }
};

// 初始化 multer 中间件
const upload = multer({
  storage: storage, // 使用上面配置的存储引擎
  fileFilter: fileFilter, // 使用上面的过滤规则
  limits: {
    fileSize: 5 * 1024 * 1024 // 限制文件大小（5MB）
  }
});

// 定义文件上传接口（单张图片）
router.post('/api/upload', upload.single('file'), async (ctx) => {
  try {
    // 上传成功后，ctx.file 包含上传的文件信息
    const file = ctx.file;
    if (!file) {
      ctx.status = 400;
      ctx.body = { success: false, message: '请选择图片' };
      return;
    }

    const imgUrl = `http://localhost:3000/${file.filename}`;

    // 返回 URL 给前端
    ctx.body = {
      success: true,
      imgUrl: imgUrl,
      message: '图片上传成功'
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { success: false, message: err.message || '上传失败' };
  }
});

// 托管 uploads 文件夹，让前端能通过 URL 访问图片
app.use(serve(path.join(__dirname, 'uploads'), {
  prefix: '/uploads' 
}));

app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
  console.log(`服务器已启动在 http://localhost:${port}`);
});