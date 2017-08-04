(function(){

glyph.Particle = function( context )
	{
		this.context = context;
		
		this.life = 0;
		this.life_offset = 0;
		this.lifespan = null;
		this.life_start = Date.now();
		
		this.position = { x: 0, y: 0 };
		this.offset = { x: 0, y: 0 };
		this.velocity = { x: 0, y: 0 };
		this.acceleration = { x: 0, y: 0 };
		
		this.opacity = 1;
		this.opacity_end = null;
		this.opacity_start = null;
		
		this.scale = 1;
		this.scale_end = null;
		this.scale_start = null;
		
		this.radius = 1;
		this.image = null;
		
		this.colour = { r: 255, g: 255, b: 255 };
		this.colour_end = null;
		this.colour_start = null;
		
		this.rotation = 0;
		this.rotation_vel = 0;
		this.rotation_accel = 0;
		
		this.callback = null;
		
		this.draw = function( frameTime )
			{
				this.context.save();
				
				var pX = this.position.x + this.offset.x;
				var pY = this.position.y + this.offset.y;
				
				var sX = 0;
				var sY = 0;
				
				if ( this.image )
				{
					sX = ( this.image.width * this.scale ) / 2;
					sY = ( this.image.height * this.scale ) / 2;
					
					pX -= sX;
					pY -= sY;
				}
				
				this.context.translate( pX, pY );
				
				if ( this.image && this.rotation )
				{
					this.context.translate( sX, sY );
					this.context.rotate( Math.PI / 180 * this.rotation );
					this.context.translate( -1 * sX, -1 * sY );
				}
				
				if ( this.scale != 1 )
					this.context.scale( this.scale, this.scale );
				
				if( this.image )
				{
					this.context.globalAlpha = this.opacity;
					this.context.drawImage( this.image, 0, 0 );         
				}
				else
				{
					this.context.beginPath();
					
					this.context.arc( 0, 0, this.radius * this.scale, 0, 2 * Math.PI, false );
					this.context.fillStyle = 'rgba( ' + this.colour.r + ', ' + this.colour.g + ', ' + this.colour.b + ', ' + this.opacity + ')';
					
					this.context.closePath();
					this.context.fill();
				}
				
				this.context.restore();
			};
		
		this.update = function( frameTime )
			{
				this.life = Date.now() - this.life_start + this.life_offset;
				
				if ( this.lifespan !== null )
				{
					if ( this.life > this.lifespan )
						return glyph.particle.delete( this );
					
					var lifeMul = this.life / this.lifespan;
					
					if ( this.scale_end !== null )
					{
						if ( !this.scale_start )
							this.scale_start = this.scale;
						
						this.scale = glyph.lerp( this.scale_start, this.scale_end, lifeMul );
					}
					
					if ( this.opacity_end !== null )
					{
						if ( !this.opacity_start )
							this.opacity_start = this.opacity;
						
						this.opacity = glyph.lerp( this.opacity_start, this.opacity_end, lifeMul );
					}
					
					if ( this.colour_end !== null )
					{
						if ( !this.colour_start )
							this.colour_start = glyph.copy( this.colour );
						
						this.colour.r = glyph.round( glyph.lerp( this.colour_start.r, this.colour_end.r, lifeMul ) );
						this.colour.g = glyph.round( glyph.lerp( this.colour_start.g, this.colour_end.g, lifeMul ) );
						this.colour.b = glyph.round( glyph.lerp( this.colour_start.b, this.colour_end.b, lifeMul ) );
					}
				}
				else
				{
					if ( this.position.x > this.context.canvas.width ||
						this.position.y > this.context.canvas.height ||
						this.position.x < 0 || this.position.y < 0 )
							return glyph.particle.delete( this );
				}
				
				if ( this.acceleration )
				{
					this.velocity.x += this.acceleration.x * frameTime;
					this.velocity.y += this.acceleration.y * frameTime;
				}
				
				if ( this.velocity )
				{
					this.position.x += this.velocity.x * frameTime;
					this.position.y += this.velocity.y * frameTime;
				}
				
				if ( this.rotation )
				{
					this.rotation_vel += this.rotation_accel * frameTime;
					this.rotation += this.rotation_vel * frameTime;
				}
				
				if ( this.callback )
					this.callback( this, frameTime );
			};
	};

var particles = [];
var contexts = [];
var lastUpdate = Date.now();
var lastRequest = false;
function draw()
{
	contexts.forEach( function( context )
		{
			context.clearRect( 0, 0, context.canvas.width, context.canvas.height );
		});
	
	var frameTime = ( Date.now() - lastUpdate ) / 1000;
	lastUpdate = Date.now();
	
	particles.forEach( function( p ) { p.update( frameTime ); } );
	particles.forEach( function( p ) { p.draw( frameTime ); } );
	
	lastRequest = requestAnimationFrame( draw );
}

glyph.particle = {};

glyph.particle.delete = function( p )
	{
		for ( var i = 0; i < particles.length; i++ )
			if ( particles[i] === p )
				particles.splice( i, 1 );
	};

glyph.particle.create = function( context )
	{
		var particle = new glyph.Particle( context );
		return particle;
	};

var imageCache = {};
glyph.particle.emit = function( p )
	{
		// if we haven't had focus for 5 seconds, don't emit any new particles
		// or we'll end up getting a huuuuuuge backlog once we get focus again
		if ( Date.now() > lastUpdate + 5 * 1000 )
			return;
		
		if ( glyph.isArray( p.colour ) )
			p.colour = { r: p.colour[0], g: p.colour[1], b: p.colour[2] };
		
		if ( glyph.isArray( p.colour_end ) )
			p.colour_end = { r: p.colour_end[0], g: p.colour_end[1], b: p.colour_end[2] };
		
		if ( glyph.isArray( p.position ) )
			p.position = { r: p.position[0], g: p.position[1], b: p.position[2] };
		
		if ( glyph.isArray( p.offset ) )
			p.offset = { r: p.offset[0], g: p.offset[1], b: p.offset[2] };
		
		if ( glyph.isArray( p.velocity ) )
			p.velocity = { r: p.velocity[0], g: p.velocity[1], b: p.velocity[2] };
		
		if ( glyph.isArray( p.acceleration ) )
			p.acceleration = { r: p.acceleration[0], g: p.acceleration[1], b: p.acceleration[2] };
		
		if ( typeof p.image == 'string' )
		{
			if ( imageCache[ p.image ] )
				p.image = imageCache[ p.image ];
			else
			{
				var img = new Image();
				img.src = p.image;
				imageCache[ p.image ] = img;
				p.image = img;
				img.onload = function() { particles.push( p ); };
				return;
			}
		}
		
		particles.push( p );
	};

var particleInit = false;
glyph.particle.init = function( canvas )
	{
		if ( !particleInit )
		{
			lastRequest = requestAnimationFrame( draw );
			particleInit = true;
		}
		
		var context = canvas.getContext( '2d' );
		context.canvas = canvas;
		contexts.push( context );
		return context;
	};

glyph.event( window, 'focus', function()
	{
		// sometimes chrome seems to cancel requests
		// if the tab's been out of focus for a while
		if ( particleInit )
		{
			cancelAnimationFrame( lastRequest );
			lastRequest = requestAnimationFrame( draw );
		}
	});

}());
