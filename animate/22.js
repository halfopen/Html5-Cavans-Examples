 var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
//参数定义
var CircleRadius = 10,//小圆的半径
    RGB,//颜色
    Angle, //角度
    //计数器
    NumOfSmallCircle=7, //最里层小圆的数量
    NumOfRing=6,  //圆形环数
    AngleChangeSize = 0, //角度转动的程度
    Direction, //圆圈转的方向，1为顺时针，-1为逆时针
    
    //轨迹半径计算（因为考虑到轨迹上任意两圆的圆心到大圆的圆心距离相等，所以三点
      //可以构成一个等腰三角形，我们再根据等腰三角形求边长的公式计算）
   PathRadius = (CircleRadius*2+1)/2/(Math.sin(Math.PI*2/NumOfSmallCircle/2));
   function DrawCircle(AngleChange){
    for(var i=1;i<=NumOfRing;i++)
    {
        //用于图片旋转方向的判定设置
        if(i%2==1)
        {
            Direction=1;
        } else {
            Direction=-1;
        }
        RGB = Math.floor(Math.random()*255);
        for(var j=1;j<=NumOfSmallCircle*i;j++)
        {
            //计算角度
            Angle = (Math.PI*2/NumOfSmallCircle/i*j)+(Math.PI*2/360*AngleChange*Direction);
            context.beginPath();
            //绘制小圆位置
            context.arc(canvas.width/2+PathRadius*(i)*Math.cos(Angle),
              canvas.height/2+PathRadius*(i)*Math.sin(Angle),CircleRadius,0,Math.PI*2,true);
            //设置变化的RGB值
            context.fillStyle = 'rgb('+RGB+','+Math.floor(RGB/4)+','+(255-RGB)+')';
            context.fill();
        }
    }
}
function Draw(){
    //擦除上次的画圆结果，使得小圆的变化看起来是动态的
    //如果不懂的话，注释掉下面一行，再看效果
    context.clearRect(0,0,canvas.width,canvas.height);
    //用于滚动设置
    AngleChangeSize==360?AngleChangeSize=0:AngleChangeSize++;
    DrawCircle(AngleChangeSize);
}
var LOOP = setInterval('Draw()',150);