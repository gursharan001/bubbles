var Bubbles = (function () {
    function Bubbles(canvasElement) {
        // Create canvas and engine
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }
    Bubbles.prototype.createScene = function () {
        var scene = new BABYLON.Scene(this._engine);
        scene.enablePhysics(BABYLON.Vector3.Zero(), new BABYLON.CannonJSPlugin());
        var camera = this.addCamera(scene, this._canvas);
        var light = this.addLight(scene);
        this.addTasks(scene);
        this.addPlayground(scene);
        this._scene = scene;
        this._camera = camera;
        this._light = light;
    };
    Bubbles.prototype.addCamera = function (scene, canvas) {
        var camera = new BABYLON.ArcRotateCamera('camera1', Math.PI / 8, Math.PI / 2.5, 50, BABYLON.Vector3.Zero(), scene);
        // target the camera to scene origin
        //camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        camera.attachControl(canvas, false);
        //camera.checkCollisions = true;
        //camera.applyGravity = true;
        return camera;
    };
    Bubbles.prototype.addLight = function (scene) {
        var light = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(0.2, -1, 0), scene);
        light.position = new BABYLON.Vector3(0, 80, 0);
        return light;
    };
    Bubbles.prototype.addPlayground = function (scene) {
        var ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
        ground.scaling = new BABYLON.Vector3(100, 1, 100);
        ground.position.y = -5.0;
        ground.checkCollisions = true;
        var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
        border0.scaling = new BABYLON.Vector3(1, 100, 100);
        border0.position.y = -5.0;
        border0.position.x = -50.0;
        border0.checkCollisions = true;
        var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
        border1.scaling = new BABYLON.Vector3(1, 100, 100);
        border1.position.y = -5.0;
        border1.position.x = 50.0;
        border1.checkCollisions = true;
        var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
        border2.scaling = new BABYLON.Vector3(100, 100, 1);
        border2.position.y = -5.0;
        border2.position.z = 50.0;
        border2.checkCollisions = true;
        var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
        border3.scaling = new BABYLON.Vector3(100, 100, 1);
        border3.position.y = -5.0;
        border3.position.z = -50.0;
        border3.checkCollisions = true;
        var roof = BABYLON.Mesh.CreateBox("Roof", 1, scene);
        roof.scaling = new BABYLON.Vector3(100, -1, 100);
        roof.position.y = 45.0;
        roof.checkCollisions = true;
        var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
        groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        groundMat.backFaceCulling = false;
        roof.material = groundMat;
        ground.material = groundMat;
        border0.material = groundMat;
        border1.material = groundMat;
        border2.material = groundMat;
        border3.material = groundMat;
        roof.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
        border0.physicsImpostor = new BABYLON.PhysicsImpostor(border0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
        border1.physicsImpostor = new BABYLON.PhysicsImpostor(border1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
        border2.physicsImpostor = new BABYLON.PhysicsImpostor(border2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
        border3.physicsImpostor = new BABYLON.PhysicsImpostor(border3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
    };
    Bubbles.prototype.addTasks = function (scene) {
        // Spheres
        var y = 0;
        for (var index = 0; index < 30; index++) {
            var sphere = BABYLON.Mesh.CreateSphere("Sphere" + index, 32, 3, scene);
            //sphere.material = materialAmiga;
            sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);
            var letters = "Task " + (index + 1);
            var dynTex = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
            dynTex.drawText(letters, null, 250, "25px verdana", "black", "white");
            dynTex.wAng = Math.PI;
            dynTex.vOffset = -0.05;
            dynTex.uOffset = -0.25;
            var material = new BABYLON.StandardMaterial("sMat", scene);
            material.diffuseTexture = dynTex;
            sphere.material = material;
            var physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 1 }, scene);
            var negative = Math.random() > 0.5 ? 1 : -1;
            physicsImpostor.applyImpulse(new BABYLON.Vector3(negative * 20, 0, negative * 10), sphere.getAbsolutePosition());
            sphere.physicsImpostor = physicsImpostor;
            y += 2;
        }
    };
    Bubbles.prototype.doRender = function () {
        var _this = this;
        // run the render loop
        this._engine.runRenderLoop(function () {
            _this._scene.render();
        });
        // the canvas/window resize event handler
        window.addEventListener('resize', function () {
            _this._engine.resize();
        });
    };
    return Bubbles;
}());
window.addEventListener('DOMContentLoaded', function () {
    // Create the game using the 'renderCanvas'
    var game = new Bubbles('renderCanvas');
    // Create the scene
    game.createScene();
    // start animation
    game.doRender();
});
