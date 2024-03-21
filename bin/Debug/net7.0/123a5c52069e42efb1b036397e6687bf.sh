function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 75612;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 75612 > /dev/null;
done;

for child in $(list_child_processes 75642);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/casperpilgaard/Desktop/test/bin/Debug/net7.0/123a5c52069e42efb1b036397e6687bf.sh;
