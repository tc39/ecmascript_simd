<a name="SIMD"></a>
## SIMD
**Kind**: global class

* [SIMD](#SIMD)
  * [.float32x4(value, value, value, value)](#SIMD.float32x4)
    * [.withY(t, value)](#SIMD.float32x4.withY) ⇒ <code>float32x4</code>

<a name="SIMD.float32x4"></a>
### SIMD.float32x4(value, value, value, value)
Construct a new instance of float32x4 number.

**Kind**: static method of <code>[SIMD](#SIMD)</code>

| Param | Type | Description |
| --- | --- | --- |
| value | <code>double</code> | used for x lane. |
| value | <code>double</code> | used for y lane. |
| value | <code>double</code> | used for z lane. |
| value | <code>double</code> | used for w lane. |

<a name="SIMD.float32x4.withY"></a>
#### float32x4.withY(t, value) ⇒ <code>float32x4</code>
**Kind**: static method of <code>[float32x4](#SIMD.float32x4)</code>
**Returns**: <code>float32x4</code> - New instance of float32x4 with the values in t and
y replaced with {y}.

| Param | Type | Description |
| --- | --- | --- |
| t | <code>float32x4</code> | An instance of float32x4. |
| value | <code>double</code> | used for y lane. |
