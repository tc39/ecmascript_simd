/*
  Copyright (C) 2014 Zachary Anderson (zanderso@gmail.com)

  This software is provided 'as-is', without any express or implied
  warranty.  In no event will the authors be held liable for any damages
  arising from the use of this software.

  Permission is granted to anyone to use this software for any purpose,
  including commercial applications, and to alter it and redistribute it
  freely, subject to the following restrictions:

  1. The origin of this software must not be misrepresented; you must not
     claim that you wrote the original software. If you use this software
     in a product, an acknowledgment in the product documentation would be
     appreciated but is not required.
  2. Altered source versions must be plainly marked as such, and must not be
     misrepresented as being the original software.
  3. This notice may not be removed or altered from any source distribution.

*/

import 'dart:math';
import 'dart:typed_data';
import 'package:vector_math/vector_math.dart';
import 'package:vector_math/vector_math_operations.dart';
import 'package:benchmark_harness/benchmark_harness.dart';
import 'benchmark_contrast.dart';

class Float32x4Ext {
  Float32x4 sqrt(Float32x4 x) {
    return x.sqrt();
  }
  Float32x4 mul(Float32x4 x, Float32x4 y) {
    return x * y;
  }
  Float32x4 sub(Float32x4 x, Float32x4 y) {
    return x - y;
  }
  Float32x4 add(Float32x4 x, Float32x4 y) {
    return x + y;
  }
  Float32x4 abs(Float32x4 x) {
    return x.abs();
  }
  Float32x4 neg(Float32x4 x) {
    return -x;
  }
  Float32x4 div(Float32x4 x, Float32x4 y) {
    return x / y;
  }
  Float32x4 splat(double x) {
    return new Float32x4.splat(x);
  }
  Float32x4 zero() {
    return new Float32x4.zero();
  }
  Int32x4 bitsToInt32x4(Float32x4 x) {
    return new Int32x4.fromFloat32x4Bits(x);
  }

  Int32x4 greaterThan(Float32x4 x, Float32x4 y) {
    return x.greaterThan(y);
  }
  Int32x4 lessThan(Float32x4 x, Float32x4 y) {
    return x.lessThan(y);
  }
}

class Int32x4Ext {
  Int32x4 and(Int32x4 x, Int32x4 y) {
    return x & y;
  }
  Int32x4 or(Int32x4 x, Int32x4 y) {
    return x | y;
  }
  Int32x4 not(Int32x4 x) {
    return x ^ (new Int32x4(0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF));
  }
  Float32x4 bitsToFloat32x4(Int32x4 x) {
    return new Float32x4.fromInt32x4Bits(x);
  }
  Int32x4 splat(int i) {
    return new Int32x4(i,i,i,i);
  }
  Int32x4 add(Int32x4 x, Int32x4 y) {
    return x + y;
  }
}

class SIMDExt {
  final _float32x4 = new Float32x4Ext();
  final _int32x4 = new Int32x4Ext();

  Float32x4Ext get float32x4 => _float32x4;
  Int32x4Ext get int32x4 => _int32x4;
}

SIMDExt SIMD = new SIMDExt();

class Sphere {
  final Vector3 _center;
  double _radius;

  Vector3 get center => _center;
  double get radius => _radius;
         set radius(double value) => _radius = value;

  Sphere() :
    _center = new Vector3.zero(),
    _radius = 0.0 {}

  Sphere.centerRadius(Vector3 center_, double radius_) :
    _center = new Vector3.copy(center_),
    _radius = radius_ {}
}

class Plane {
  final Vector3 _normal;
  final Vector3 _point;

  Vector3 get n => _normal;
  Vector3 get p => _point;

  Plane() :
    _normal = new Vector3(0, 1, 0),
    _point  = new Vector3.zero() {}

  Plane.normalPoint(Vector3 n, Vector3 p) :
    _normal = new Vector3.copy(n),
    _point = new Vector3.copy(p) {}
}

class Intersection {
  double _t;
  int _hit;
  Vector3 _p;
  Vector3 _n;

  double get t => _t;
         set t(double v) => _t = v;
  int get hit => _hit;
          set hit(int v) => _hit = v;
  Vector3 get p => _p;
          set p(Vector3 v) => _p = new Vector3.copy(v);
  Vector3 get n => _n;
          set n(Vector3 v) => _n = new Vector3.copy(v);

  Intersection() :
    _t = 0.0,
    _hit = 0,
    _p = new Vector3.zero(),
    _n = new Vector3.zero() {}

  Intersection.all(double t, int hit, Vector3 p, Vector3 n) :
    _t = t, _hit = hit, _p = new Vector3.copy(p), _n = new Vector3.copy(n) {}

  Intersection.thit(double t, int hit) :
    _t = t, _hit = hit, _p = new Vector3.zero(), _n = new Vector3.zero() {}

  Intersection.pn(Vector3 p, Vector3 n) :
    _t = 0.0, _hit = 0, _p = new Vector3.copy(p), _n = new Vector3.copy(n) {}
}

class Float32x4Vector3 {
  Float32x4 _x;
  Float32x4 _y;
  Float32x4 _z;

  Float32x4 get x => _x;
            set x(Float32x4 v) => _x = v;
  Float32x4 get y => _y;
            set y(Float32x4 v) => _y = v;
  Float32x4 get z => _z;
            set z(Float32x4 v) => _z = v;

  Float32x4Vector3(Float32x4 x, Float32x4 y, Float32x4 z) :
    _x = x, _y = y, _z = z {}

  Float32x4Vector3.zero() :
      _x = new Float32x4.zero(),
      _y = new Float32x4.zero(),
      _z = new Float32x4.zero() {}
}

class SIMDIntersection {
  Float32x4 _t;
  Int32x4 _hit;
  Float32x4Vector3 _p;
  Float32x4Vector3 _n;

  Float32x4 get t => _t;
            set t(Float32x4 v) => _t = v;
  Int32x4   get hit => _hit;
            set hit(Int32x4 v) => _hit = v;
  Float32x4Vector3 get p => _p;
  Float32x4Vector3 get n => _n;

  SIMDIntersection() :
    _t = new Float32x4.zero(),
    _hit = new Int32x4(0,0,0,0),
    _p = new Float32x4Vector3.zero(),
    _n = new Float32x4Vector3.zero() {}

  SIMDIntersection.thit(Float32x4 t, Int32x4 hit) :
    _t = t, _hit = hit,
    _p = new Float32x4Vector3.zero(),
    _n = new Float32x4Vector3.zero() {}

  SIMDIntersection.pn(Float32x4Vector3 p, Float32x4Vector3 n) :
    _t = new Float32x4.zero(),
    _hit = new Int32x4(0,0,0,0),
    _p = p, _n = n {}
}


class Ray {
  final Vector3 _org;
  final Vector3 _dir;

  Vector3 get org => _org;
  Vector3 get dir => _dir;

  Ray() :
    _org = new Vector3.zero(),
    _dir = new Vector3(0, 1.0, 0) {}

  Ray.orgdir(Vector3 org, Vector3 dir) :
    _org = new Vector3.copy(org), _dir = new Vector3.copy(dir) {}
}

List rands1 =
    [0.1352356830611825,  0.288015044759959,   0.7678821850568056,  0.2686317905317992,
     0.3331136927008629,  0.8684257145505399,  0.781927386065945,   0.5896540696267039,
     0.44623699225485325, 0.9686877066269517,  0.07219804194755852, 0.32867410429753363,
     0.25455036014318466, 0.6900878311134875,  0.32115139183588326, 0.8623794671148062,
     0.41069260938093066, 0.999176808167249,   0.31144002149812877, 0.21190544497221708,
     0.589751492254436,   0.618399447761476,   0.7838233797810972,  0.22662024036981165,
     0.5274769144598395,  0.8913978524506092,  0.2461202829144895,  0.575232774252072,
     0.20723191439174116, 0.15211533522233367, 0.5140219402965158,  0.695398824987933,
     0.7201623972505331,  0.1737971710972488,  0.3138047114480287,  0.09142904286272824,
     0.15824169223196805, 0.11588017432950437, 0.4076798539608717,  0.06385629274882376,
     0.9907234299462289,  0.1742915315553546,  0.9236432255711406,  0.8344372694846243,
     0.05793144227936864, 0.35464465571567416, 0.3937969475518912,  0.8209003841038793,
     0.6443945677019656,  0.15443599177524447, 0.8957053178455681,  0.4145913925021887,
     0.4667414356954396,  0.42764953384175897, 0.03486692951992154, 0.13391495239920914,
     0.6122364429756999,  0.7934473238419741,  0.13505113637074828, 0.7279673060402274,
     0.3638722419273108,  0.30750402715057135, 0.8705337035935372,  0.3060465627349913];

List rands2 =
    [0.6100146626122296,  0.8141843967605382,  0.7538463387172669,  0.538857217412442,
     0.7884696905966848,  0.2656198723707348,  0.3280213042162359,  0.25133296218700707,
     0.18718935316428542, 0.7374026740435511,  0.8333564973436296,  0.22081619454547763,
     0.08140448946505785, 0.7737920694053173,  0.9531879865098745,  0.385226191021502,
     0.8437968089710921,  0.45293551217764616, 0.11351405014283955, 0.6402874339837581,
     0.9657228307332844,  0.5241556512191892,  0.9501411342062056,  0.7991736396215856,
     0.7572617880068719,  0.6777111298870295,  0.19950113398954272, 0.09956562682054937,
     0.03746219468303025, 0.18719390942715108, 0.1519025124143809,  0.8241845818702132,
     0.9609565436840057,  0.7231316142715514,  0.26712060417048633, 0.7414182834327221,
     0.4706993775907904,  0.9619642498437315,  0.14598079677671194, 0.1517641346435994,
     0.5583144023548812,  0.7664180144201964,  0.8109071112703532,  0.4008640209212899,
     0.10891564912162721, 0.8558103002142161,  0.03816548571921885, 0.4263107746373862,
     0.280488790711388,   0.915016517508775,   0.8379701666999608,  0.5821647725533694,
     0.3671900019980967,  0.6120628621429205,  0.5861144624650478,  0.5639409353025258,
     0.4884668991435319,  0.9718172331340611,  0.4438377188052982,  0.9853541473858058,
     0.021908782655373216,0.6144221667200327,  0.11301262397319078, 0.17565111187286675];

List spheres =
    [new Sphere.centerRadius(new Vector3(-2.0, 0.0, -3.5), 0.5),
     new Sphere.centerRadius(new Vector3(-0.5, 0.0, -3.0), 0.5),
     new Sphere.centerRadius(new Vector3(1.0, 0.0, -2.2), 0.5)];

Plane plane = new Plane.normalPoint(new Vector3(0.0, -0.5, 0.0),
                                    new Vector3(0.0, 1.0, 0.0));

Intersection isect0 = new Intersection.all(
    0.7907924036719444,
    1,
    new Vector3(0.3484251968503937, -0.49999999999999994, -0.5039370078740157),
    new Vector3(0.0, 1.0, 0.0));

int NAO_SAMPLES = 8;

double vdot(Vector3 v0, Vector3 v1) {
  return v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
}

Vector3 vcross(Vector3 v0, Vector3 v1) {
  return new Vector3(
      v0.y * v1.z - v0.z * v1.y,
      v0.z * v1.x - v0.x * v1.z,
      v0.x * v1.y - v0.y * v1.x);
}

void vnormalize(Vector3 c) {
  var length = sqrt(vdot(c, c));
  if (length.abs() > 1e-17) {
    c.x /= length;
    c.y /= length;
    c.z /= length;
  }
}

void orthoBasis(List basis, Vector3 n) {
  basis[2] = new Vector3.copy(n);
  basis[1] = new Vector3(0.0, 0.0, 0.0);

  if ((n.x < 0.6) && (n.x > -0.6)) {
    basis[1].x = 1.0;
  }
  else if ((n.y < 0.6) && (n.y > -0.6)) {
    basis[1].y = 1.0;
  }
  else if ((n.z < 0.6) && (n.z > -0.6)) {
    basis[1].z = 1.0;
  }
  else {
    basis[1].x = 1.0;
  }

  basis[0] = vcross(basis[1], basis[2]);
  vnormalize(basis[0]);

  basis[1] = vcross(basis[2], basis[0]);
  vnormalize(basis[1]);
}

class NonSIMDAOBench extends BenchmarkBase {
  const NonSIMDAOBench() : super("NonSIMDAOBench");

  Vector3 ambient_occlusion(Intersection isect) {
    Vector3 col = new Vector3.zero();

    var ntheta = NAO_SAMPLES;
    var nphi = NAO_SAMPLES;
    var eps = 0.0001;

    Vector3 p = new Vector3(
        isect.p.x + eps * isect.n.x,
        isect.p.y + eps * isect.n.y,
        isect.p.z + eps * isect.n.z);

    List basis = new List(3);
    orthoBasis(basis, isect.n);

    var occlusion = 0;

    for (var j = 0; j < ntheta; j++) {
      for (var i = 0; i < nphi; i++) {
        var theta = sqrt(rands1[j * ntheta + i]);
        var phi = 2 * PI * rands2[j * ntheta + i];

        var x = cos(phi) * theta;
        var y = sin(phi) * theta;
        var z = sqrt(1 - theta * theta);

        var rx = x * basis[0].x + y * basis[1].x + z * basis[2].x;
        var ry = x * basis[0].y + y * basis[1].y + z * basis[2].y;
        var rz = x * basis[0].z + y * basis[1].z + z * basis[2].z;

        Ray ray = new Ray.orgdir(p, new Vector3(rx, ry, rz));

        Intersection occIsectA = new Intersection.thit(1e17, 0);
        Intersection occIsectB = new Intersection();

        ray_sphere_intersect(occIsectA, occIsectB, ray, spheres[0]);
        ray_sphere_intersect(occIsectA, occIsectB, ray, spheres[1]);
        ray_sphere_intersect(occIsectA, occIsectB, ray, spheres[2]);
        ray_plane_intersect(occIsectA, occIsectB, ray, plane);

        if (occIsectA.hit != 0) {
          occlusion += 1.0;
        }

      }
    }

    occlusion = (ntheta * nphi - occlusion) / (ntheta * nphi);

    col.x = occlusion;
    col.y = occlusion;
    col.z = occlusion;

    return col;
  }

  void ray_sphere_intersect(Intersection isectA,
                            Intersection isectB,
                            Ray ray, 
                            Sphere sphere) {
    Vector3 rs = new Vector3(
        ray.org.x - sphere.center.x,
        ray.org.y - sphere.center.y,
        ray.org.z - sphere.center.z);

    var B = vdot(rs, ray.dir);
    var C = vdot(rs, rs) - sphere.radius * sphere.radius;
    var D = B * B - C;

    if (D > 0) {
      var t = -B - sqrt(D);
      if ((t > 0) && (t < isectA.t)) {

        isectA.t = t;
        isectA.hit = 1;

        isectB.p.x = ray.org.x + ray.dir.x * t;
        isectB.p.y = ray.org.y + ray.dir.y * t;
        isectB.p.z = ray.org.z + ray.dir.z * t;

        isectB.n.x = isectB.p.x - sphere.center.x;
        isectB.n.y = isectB.p.y - sphere.center.y;
        isectB.n.z = isectB.p.z - sphere.center.z;

        vnormalize(isectB.n);
      }
    }
  }

  void ray_plane_intersect(Intersection isectA,
                           Intersection isectB,
                           Ray ray,
                           Plane plane) {
    var d = -vdot(plane.p, plane.n);
    var v = vdot(ray.dir, plane.n);

    if (v.abs() < 1e-17) {
      return;
    }

    var t = -(vdot(ray.org, plane.n) + d) / v;

    if ((t > 0) && (t < isectA.t)) {
      isectA.t = t;
      isectA.hit = 1;
      isectB.p.x = ray.org.x + ray.dir.x * t;
      isectB.p.y = ray.org.y + ray.dir.y * t;
      isectB.p.z = ray.org.z + ray.dir.z * t;
      isectB.n = plane.n;
    }
  }

  void run() {
    for (var i = 0; i < 100; i++) {
      ambient_occlusion(isect0);
    }
  }
}


class SIMDAOBench extends BenchmarkBase {
  const SIMDAOBench() : super("SIMDAOBench");

  Vector3 ambient_occlusion_simd(Intersection isect) {
    Vector3 col = new Vector3.zero();

    var i, j;
    var ntheta = NAO_SAMPLES;
    var nphi = NAO_SAMPLES;
    var eps = 0.0001;

    Vector3 p = new Vector3(
        isect.p.x + eps * isect.n.x,
        isect.p.y + eps * isect.n.y,
        isect.p.z + eps * isect.n.z);

    List basis = new List(3);
    orthoBasis(basis, isect.n);

    var occlusion = 0;
    var occlusionx4 = new Float32x4.zero();
    var one_point_oh = new Float32x4.splat(1.0);

    for (j = 0; j < ntheta; j++) {
      for (i = 0; i < nphi; i += 4) {
        var theta =
            (new Float32x4(rands1[j * ntheta + i], rands1[j * ntheta + i + 1],
                           rands1[j * ntheta + i + 2], rands1[j * ntheta + i + 3])).sqrt();
        var phi0 = 2 * PI * rands2[j * ntheta + i];
        var phi1 = 2 * PI * rands2[j * ntheta + i + 1];
        var phi2 = 2 * PI * rands2[j * ntheta + i + 2];
        var phi3 = 2 * PI * rands2[j * ntheta + i + 3];
        var sinphi = new Float32x4(sin(phi0), sin(phi1), sin(phi2), sin(phi3));
        var cosphi = new Float32x4(cos(phi0), cos(phi1), cos(phi2), cos(phi3));

        var x = cosphi * theta;
        var y = sinphi * theta;
        var z = ((one_point_oh) - (theta * theta)).sqrt();

        var dirx = (x * (new Float32x4.splat(basis[0].x))) +
            ((y * (new Float32x4.splat(basis[1].x))) +
             (z * (new Float32x4.splat(basis[2].x))));
        var diry =
            ((x * (new Float32x4.splat(basis[0].y))) +
             ((y * (new Float32x4.splat(basis[1].y))) +
              (z * (new Float32x4.splat(basis[2].y)))));
        var dirz =
            ((x * (new Float32x4.splat(basis[0].z))) +
            ((y * (new Float32x4.splat(basis[1].z))) +
             (z * (new Float32x4.splat(basis[2].z)))));

        var orgx = new Float32x4.splat(p.x);
        var orgy = new Float32x4.splat(p.y);
        var orgz = new Float32x4.splat(p.z);

        SIMDIntersection occIsectA = new SIMDIntersection.thit(
          new Float32x4.splat(1e17),
          new Int32x4(0,0,0,0));

        SIMDIntersection occIsectB = new SIMDIntersection.pn(
          new Float32x4Vector3(new Float32x4.zero(),
                               new Float32x4.zero(),
                               new Float32x4.zero()),
          new Float32x4Vector3(new Float32x4.zero(),
                               new Float32x4.zero(),
                               new Float32x4.zero()));

        ray_sphere_intersect_simd(occIsectA, occIsectB, dirx, diry, dirz, orgx, orgy, orgz, spheres[0]);
        ray_sphere_intersect_simd(occIsectA, occIsectB, dirx, diry, dirz, orgx, orgy, orgz, spheres[1]);
        ray_sphere_intersect_simd(occIsectA, occIsectB, dirx, diry, dirz, orgx, orgy, orgz, spheres[2]);
        ray_plane_intersect_simd(occIsectA, occIsectB, dirx, diry, dirz, orgx, orgy, orgz, plane);

        occlusionx4 =
            (occlusionx4 + (new Float32x4.fromInt32x4Bits(
              (occIsectA.hit &
               (new Int32x4.fromFloat32x4Bits(one_point_oh))))));
      }
    }

    occlusion = occlusionx4.x + occlusionx4.y + occlusionx4.z + occlusionx4.w;

    occlusion = (ntheta * nphi - occlusion) / (ntheta * nphi);

    col.x = occlusion;
    col.y = occlusion;
    col.z = occlusion;

    return col;
  }

  void ray_sphere_intersect_simd(SIMDIntersection isectA,
                                 SIMDIntersection isectB,
                                 Float32x4 dirx, Float32x4 diry, Float32x4 dirz,
                                 Float32x4 orgx, Float32x4 orgy, Float32x4 orgz,
                                 Sphere sphere) {

    var rsx = (orgx - (new Float32x4.splat(sphere.center.x)));
    var rsy = (orgy - (new Float32x4.splat(sphere.center.y)));
    var rsz = (orgz - (new Float32x4.splat(sphere.center.z)));

    var B = ((rsx * dirx) + ((rsy * diry) + (rsz * dirz)));
    var C = (((rsx * rsx) + ((rsy * rsy) + (rsz * rsz))) -
             (new Float32x4.splat(sphere.radius * sphere.radius)));
    var D = ((B * B) - C);

    var cond1 = D.greaterThan(new Float32x4.zero());
    if (cond1.signMask != 0) {
      var t2 = new Float32x4.fromInt32x4Bits((cond1 & (new Int32x4.fromFloat32x4Bits((-B - D.sqrt())))));
      var cond2 = ((t2.greaterThan(new Float32x4.zero())) &
                   (t2.lessThan(isectA.t)));
      if (cond2.signMask != 0) {
        var notcond2 = cond2 ^ (new Int32x4.bool(true,true,true,true));
        isectA.t = new Float32x4.fromInt32x4Bits(
                     ((cond2 & (new Int32x4.fromFloat32x4Bits(t2))) |
                       (notcond2 & (new Int32x4.fromFloat32x4Bits(isectA.t)))));
        isectA.hit = cond2 | isectA.hit;
        isectB.p.x = new Float32x4.fromInt32x4Bits(
                       ((cond2 & (new Int32x4.fromFloat32x4Bits((orgx + (dirx * isectA.t))))) |
                       (notcond2 & (new Int32x4.fromFloat32x4Bits(isectB.p.x)))));
        isectB.p.y = new Float32x4.fromInt32x4Bits(
                       ((cond2 & (new Int32x4.fromFloat32x4Bits((orgx + (diry * isectA.t))))) |
                        (notcond2 & (new Int32x4.fromFloat32x4Bits(isectB.p.y)))));
        isectB.p.z = new Float32x4.fromInt32x4Bits(
                       ((cond2 & (new Int32x4.fromFloat32x4Bits((orgx + (dirz * isectA.t))))) |
                        (notcond2 & (new Int32x4.fromFloat32x4Bits(isectB.p.z)))));

        isectB.n.x = new Float32x4.fromInt32x4Bits(
                       ((cond2 & (new Int32x4.fromFloat32x4Bits((isectB.p.x - (new Float32x4.splat(sphere.center.x)))))) |
                        (notcond2 & (new Int32x4.fromFloat32x4Bits(isectB.n.x)))));
        isectB.n.y = new Float32x4.fromInt32x4Bits(
                       ((cond2 & (new Int32x4.fromFloat32x4Bits((isectB.p.y - (new Float32x4.splat(sphere.center.y)))))) |
                        (notcond2 & (new Int32x4.fromFloat32x4Bits(isectB.n.y)))));
        isectB.n.z = new Float32x4.fromInt32x4Bits(
                       ((cond2 & (new Int32x4.fromFloat32x4Bits(((isectB.p.z - (new Float32x4.splat(sphere.center.z))))))) |
                        (notcond2 & (new Int32x4.fromFloat32x4Bits(isectB.n.z)))));

        var lengths = (((isectB.n.x * isectB.n.x) +
                       ((isectB.n.y * isectB.n.y) +
                        (isectB.n.z * isectB.n.z)))).sqrt();
        var cond3 = lengths.abs().greaterThan(new Float32x4.splat(1e-17));
        var notcond3 = cond3 ^ (new Int32x4.bool(true,true,true,true));
        isectB.n.x = new Float32x4.fromInt32x4Bits(
                       ((cond3 & (new Int32x4.fromFloat32x4Bits((isectB.n.x / lengths)))) |
                       (notcond3 & (new Int32x4.fromFloat32x4Bits(isectB.n.x)))));
        isectB.n.y = new Float32x4.fromInt32x4Bits(
                       ((cond3 & (new Int32x4.fromFloat32x4Bits((isectB.n.y / lengths)))) |
                        (notcond3 & (new Int32x4.fromFloat32x4Bits(isectB.n.y)))));
        isectB.n.z = new Float32x4.fromInt32x4Bits(
                       ((cond3 & (new Int32x4.fromFloat32x4Bits((isectB.n.z / lengths)))) |
                        (notcond3 & (new Int32x4.fromFloat32x4Bits(isectB.n.z)))));
      }
    }
  }

  void ray_plane_intersect_simd(SIMDIntersection isectA, SIMDIntersection isectB,
                                Float32x4 dirx, Float32x4 diry, Float32x4 dirz,
                                Float32x4 orgx, Float32x4 orgy, Float32x4 orgz,
                                Plane plane) {
    var d = -((((new Float32x4.splat(plane.p.x)) * (new Float32x4.splat(plane.n.x))) +
              (((new Float32x4.splat(plane.p.y)) * (new Float32x4.splat(plane.n.y))) +
               ((new Float32x4.splat(plane.p.z)) * (new Float32x4.splat(plane.n.z))))));
    var v = ((dirx * (new Float32x4.splat(plane.n.x))) +
            ((diry * (new Float32x4.splat(plane.n.y))) +
             (dirz * (new Float32x4.splat(plane.n.z)))));

    var cond1 = v.abs().greaterThan(new Float32x4.splat(1e-17));
    var dp = ((orgx * (new Float32x4.splat(plane.n.x))) +
              ((orgy * (new Float32x4.splat(plane.n.y))) +
               (orgz * (new Float32x4.splat(plane.n.z)))));
    var t2 = new Float32x4.fromInt32x4Bits((cond1 & (new Int32x4.fromFloat32x4Bits((-((dp + d)) / v)))));
    var cond2 = t2.greaterThan(new Float32x4.zero()) & t2.lessThan(isectA.t);
    if (cond2.signMask != 0) {
      var notcond2 = cond2 ^ (new Int32x4.bool(true,true,true,true));
      isectA.t = new Float32x4.fromInt32x4Bits(((cond2 & (new Int32x4.fromFloat32x4Bits(t2))) |
                                               (notcond2 & (new Int32x4.fromFloat32x4Bits(isectA.t)))));
      isectA.hit = (cond2 | isectA.hit);
      isectB.p.x = new Float32x4.fromInt32x4Bits(
                     ((cond2 & (new Int32x4.fromFloat32x4Bits((orgx + (dirx * isectA.t))))) |
                      (notcond2 & (new Int32x4.fromFloat32x4Bits(isectB.p.x)))));
      isectB.p.y = new Float32x4.fromInt32x4Bits(
                    ((cond2 & (new Int32x4.fromFloat32x4Bits((orgx + (diry * isectA.t)))))) |
                     (notcond2 & (new Int32x4.fromFloat32x4Bits(isectB.p.y))));
      isectB.p.z = new Float32x4.fromInt32x4Bits(
                    ((cond2 & (new Int32x4.fromFloat32x4Bits((orgx + (dirz * isectA.t)))))) |
                     (notcond2 & (new Int32x4.fromFloat32x4Bits(isectB.p.z))));

      isectB.n.x = new Float32x4.fromInt32x4Bits(
                     ((cond2 & (new Int32x4.fromFloat32x4Bits(new Float32x4.splat(plane.n.x)))) |
                     (notcond2 & (new Int32x4.fromFloat32x4Bits(isectB.n.x)))));
      isectB.n.y = new Float32x4.fromInt32x4Bits(
                     ((cond2 & (new Int32x4.fromFloat32x4Bits(new Float32x4.splat(plane.n.y)))) |
                     (notcond2 & (new Int32x4.fromFloat32x4Bits(isectB.n.y)))));
      isectB.n.z = new Float32x4.fromInt32x4Bits(
                     ((cond2 & (new Int32x4.fromFloat32x4Bits(new Float32x4.splat(plane.n.z)))) |
                     (notcond2 & (new Int32x4.fromFloat32x4Bits(isectB.n.z)))));
    }
  }

  void run() {
    for (var i = 0; i < 100; i++) {
      ambient_occlusion_simd(isect0);
    }
  }
}

class AOBenchBenchmark {
  static Object create() {
    return new BenchmarkContrast("AOBench",
                                 new NonSIMDAOBench(),
                                 new SIMDAOBench());
  }
}
