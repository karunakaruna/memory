            AFRAME.registerComponent('mouse-rotate',{
              schema : { speed : {default:1}},
              init : function(){

                //█> initialize variables for mouse Delta animation
                        this.xPos = 0;
                        this.yPos = 0;
                        this.dX = 0;
                        this.dY = 0;

                //█> screen width
                        var width = window.innerWidth
                          || document.documentElement.clientWidth
                          || document.body.clientWidth;

                //█> screen height
                        var height = window.innerHeight
                          || document.documentElement.clientHeight
                          || document.body.clientHeight;

                //█> set centerpoint point to half screen w/h
                        this.x_cord = (width/2);
                        this.y_cord = (height/2);
                
              document.addEventListener('mousemove',this.OnDocumentMouseMove.bind(this));
              
                var counter = 0;
                                },
   
//           ═════ Mouse Tick / position of mouse 
      tick: function () {
          if (this.mouseX)
          {
              // TEMP_# center point (-) mouse position - distance from screen center
                this.temp_x = this.x_cord-this.mouseX;
                this.temp_y = this.y_cord-this.mouseY;
              // distance between 
                this.dX = this.temp_x - this.xPos;
                this.dY = this.temp_y - this.yPos;

                this.xPos += (this.dX / 30);
                this.yPos += (this.dY / 30);
            
                let q = new THREE.Quaternion();
                let quaternion = this.el.object3D.getWorldQuaternion(q);
            
                let eulerOrder = 'XYZ';
                var rotation = new THREE.Euler().setFromQuaternion( quaternion, eulerOrder );          
                var z = rotation.z;         
            
                this.el.object3D.rotateY(this.dX*this.data.speed/-10000);
                this.el.object3D.rotateX(this.dY*this.data.speed/-10000); 
                this.el.object3D.rotateZ(-z);
                
                // const mesh = new THREE.Mesh();
                let vec = new THREE.Vector3();
                var position = this.el.object3D.getWorldPosition(vec);
                var z = position.z;
                var y = position.y;
                this.el.object3D.translateX(this.dX*this.data.speed/-5000);
                this.el.object3D.translateY(this.dY*this.data.speed/5000); 
                // this.el.object3D.rotateZ(-z);
    
                this.counter += 1;
            
            // ████████████████████Mouse overlay████████
                document.getElementById('msg').innerHTML =  'mouseX: '+ this.mouseX + '<br>' + 
                                                            'mouseY: '+ this.mouseY + '<br>' +
                                                            'dX: ' + this.dX + '<br>' +
                                                            'dY: ' + this.dY + '<br>' +
                                                            'temp_x: ' + this.temp_x + '<br>' +
                                                            'temp_y: ' + this.temp_y + '<br>' +
                                                            'xPos: ' + this.xPos + '<br>' +
                                                            'yPos: ' + this.yPos + '<br>' +
                                                            'this counter' + this.counter + '<br>' +
                                                            'object: ' + window.objectIntersection;
            
                var d = document.getElementById('msg');
                d.style.position = "absolute";
                d.style.left = this.mouseX+'px';
                d.style.top = this.mouseY+'px';}},
              
      //████████████████████████ Mouse Move >- on mouse move capture mouse x,y and save to mouseX,mouseY 
                OnDocumentMouseMove : function(event)
                {
                  this.mouseX = event.clientX;
                  this.mouseY = event.clientY; 
                  this.counter = 0;
                }
    });
