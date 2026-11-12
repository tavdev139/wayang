import struct, zlib

def analyze(path):
    with open(path,'rb') as f: data=f.read()
    pos=8; idat=b''
    ihdr=None
    while pos < len(data):
        length=struct.unpack('>I',data[pos:pos+4])[0]
        ctype=data[pos+4:pos+8].decode('latin1')
        cdata=data[pos+8:pos+8+length]
        if ctype=='IHDR':
            ihdr=cdata
        if ctype=='IDAT':
            idat+=cdata
        pos+=12+length
    width,height=struct.unpack('>II',ihdr[:8])
    bit_depth,color_type=struct.unpack('>BB',ihdr[8:10])
    raw=zlib.decompress(idat)
    if color_type==6: bpp=4
    elif color_type==2: bpp=3
    elif color_type==0: bpp=1
    elif color_type==4: bpp=2
    else: raise ValueError('ct',color_type)
    row_bytes=width*bpp
    prev=bytearray(row_bytes)
    minx=width;maxx=0;miny=height;maxy=0
    idx=0
    for y in range(height):
        ftype=raw[idx]; idx+=1
        row=bytearray(raw[idx:idx+row_bytes]); idx+=row_bytes
        # unfilter
        if ftype==1:
            for i in range(bpp,row_bytes): row[i]=(row[i]+row[i-bpp])&0xFF
        elif ftype==2:
            for i in range(row_bytes): row[i]=(row[i]+prev[i])&0xFF
        elif ftype==3:
            for i in range(row_bytes):
                a=row[i-bpp] if i>=bpp else 0; row[i]=(row[i]+(a>>1))&0xFF
        elif ftype==4:
            for i in range(row_bytes):
                a=row[i-bpp] if i>=bpp else 0; b=prev[i]; c=prev[i-bpp] if i>=bpp else 0
                p=a+b-c; pa,pb,pc=abs(p-a),abs(p-b),abs(p-c)
                pr=a if pa<=pb and pa<=pc else (b if pb<=pc else c)
                row[i]=(row[i]+pr)&0xFF
        has_alpha = (color_type in (6,4))
        for x in range(width):
            off=x*bpp
            a=row[off+bpp-1] if has_alpha else 255
            if a>10:
                minx=min(minx,x);maxx=max(maxx,x);miny=min(miny,y);maxy=max(maxy,y)
        prev=row
    print(path.split('/')[-1], '|', width,'x',height,'| bbox x:',minx,maxx,'| y:',miny,maxy)

for f in ['upper-arm-arjuna-l.png','forearm-arjuna-l.png','hand-arjuna-l.png']:
    analyze('C:/Users/hp ssd/Downloads/wayang/assets/'+f)
